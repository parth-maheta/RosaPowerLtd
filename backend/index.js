const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Config (for event images)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "P@rth1210",
  database: "rosa_power_plant",
});
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
});

// Routes

// Root
app.get("/", (req, res) => {
  res.send("Rosa Power Plant API is running");
});

// Power Units
app.get("/api/units", (req, res) => {
  db.query("SELECT * FROM power_units", (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching units" });
    res.json(results);
  });
});

// Graphs
app.get("/api/graphs", (req, res) => {
  db.query(
    "SELECT * FROM graphs_data ORDER BY timestamp DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error fetching graphs" });
      res.json(results);
    }
  );
});

// Birthdays
app.get("/api/birthdays", (req, res) => {
  const sql = `
      SELECT * FROM employees 
      WHERE MONTH(dob) = MONTH(CURDATE()) 
        AND DAY(dob) = DAY(CURDATE())
    `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching birthdays" });
    res.json(results);
  });
});

// Events (GET)
app.get("/api/events", (req, res) => {
  db.query("SELECT * FROM events ORDER BY event_date DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching events" });
    res.json(results);
  });
});

// Events (POST with image upload)
app.post("/api/events", upload.single("photo"), (req, res) => {
  const { description, event_date } = req.body;
  const photo_url = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `INSERT INTO events (photo_url, description, event_date) VALUES (?, ?, ?)`;
  db.query(sql, [photo_url, description, event_date], (err, result) => {
    if (err) return res.status(500).json({ error: "Error inserting event" });
    res.json({ message: "Event added", id: result.insertId });
  });
});

// Bravo Awards
app.get("/api/awards", (req, res) => {
  const sql = `
      SELECT e.name, e.department, b.award_date 
      FROM bravo_awards b
      JOIN employees e ON b.employee_id = e.id
      ORDER BY b.award_date DESC
    `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching awards" });
    res.json(results);
  });
});
app.get("/api/files", (req, res) => {
  const { category, department } = req.query;

  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  let sql =
    "SELECT id AS sno, filename, filepath FROM downloadable_files WHERE category = ?";
  const params = [category];

  if (department) {
    sql += " AND department = ?";
    params.push(department);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching files:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const files = results.map((file) => ({
      ...file,
      downloadUrl: `/uploads/${file.filepath}`,
    }));

    res.json(files);
  });
});
// Telephone Directory API
app.get("/api/telephone-directory", (req, res) => {
  const {
    search = "",
    page = 1,
    perPage = 20,
    generalExt = false,
    location = "rpl",
  } = req.query;

  const offset = (parseInt(page) - 1) * parseInt(perPage);
  const tableName =
    location.toLowerCase() === "ho" ? "headoffice" : "employees";

  let whereClauses = [];
  let whereParams = [];

  if (search) {
    whereClauses.push(`(
      emp_code LIKE ? OR
      name LIKE ? OR
      designation LIKE ? OR
      department LIKE ? OR
      mobile_no LIKE ? OR
      ext_no LIKE ?
    )`);
    for (let i = 0; i < 6; i++) {
      whereParams.push(`%${search}%`);
    }
  }

  if (generalExt === "true") {
    whereClauses.push("ext_no LIKE '1%'");
  }

  const whereSQL =
    whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

  const sqlData = `
    SELECT emp_code, name, designation, department, mobile_no, ext_no
    FROM ${tableName}
    ${whereSQL}
    ORDER BY name ASC
    LIMIT ? OFFSET ?
  `;

  const dataParams = [...whereParams, parseInt(perPage), offset];

  const sqlCount = `
    SELECT COUNT(*) AS total
    FROM ${tableName}
    ${whereSQL}
  `;

  db.query(sqlCount, whereParams, (err, countResult) => {
    if (err) {
      console.error(`Error fetching ${tableName} count:`, err);
      return res.status(500).json({ error: "Database error" });
    }

    const total = countResult[0].total;

    db.query(sqlData, dataParams, (err, results) => {
      if (err) {
        console.error(`Error fetching ${tableName} data:`, err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ data: results, total });
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
