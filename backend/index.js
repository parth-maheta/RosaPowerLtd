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

// Static Serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure upload directories exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "P@rth1210",
  database: "rosa_power_plant",
});
db.connect((err) => {
  if (err) return console.error("❌ DB Error:", err);
  console.log("✅ Connected to MySQL");
});

// Routes
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

// Events
app.get("/api/events", (req, res) => {
  db.query("SELECT * FROM events ORDER BY event_date DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching events" });
    res.json(results);
  });
});

app.post("/api/events", upload.single("photo"), (req, res) => {
  const { description, event_date } = req.body;
  const photo_url = req.file ? `/uploads/${req.file.filename}` : null;
  db.query(
    "INSERT INTO events (photo_url, description, event_date) VALUES (?, ?, ?)",
    [photo_url, description, event_date],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error inserting event" });
      res.json({ message: "Event added", id: result.insertId });
    }
  );
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

// Downloadable files
app.get("/api/files", (req, res) => {
  const { category, department } = req.query;
  if (!category) return res.status(400).json({ error: "Category is required" });

  let sql =
    "SELECT id AS sno, filename, filepath FROM downloadable_files WHERE category = ?";
  const params = [category];

  if (department) {
    sql += " AND department = ?";
    params.push(department);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    const files = results.map((file) => ({
      ...file,
      downloadUrl: `/api/download?filepath=${encodeURIComponent(
        file.filepath
      )}&filename=${encodeURIComponent(file.filename)}`,
    }));

    res.json(files);
  });
});

// ✅ Download API (Fixes HTML download issue)
app.get("/api/download", (req, res) => {
  const { filepath, filename } = req.query;
  if (!filepath || !filename) return res.status(400).send("Invalid parameters");

  const fileFullPath = path.join(__dirname, "uploads", filepath);

  if (!fs.existsSync(fileFullPath)) {
    return res.status(404).send("File not found");
  }

  res.download(fileFullPath, filename, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).send("Failed to download file");
    }
  });
});

// Telephone Directory
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
    for (let i = 0; i < 6; i++) whereParams.push(`%${search}%`);
  }

  if (generalExt === "true") {
    whereClauses.push("ext_no LIKE '1%'");
  }

  const whereSQL = whereClauses.length
    ? `WHERE ${whereClauses.join(" AND ")}`
    : "";

  const sqlData = `
    SELECT emp_code, name, designation, department, mobile_no, ext_no
    FROM ${tableName}
    ${whereSQL}
    ORDER BY name ASC
    LIMIT ? OFFSET ?
  `;
  const sqlCount = `SELECT COUNT(*) AS total FROM ${tableName} ${whereSQL}`;
  const dataParams = [...whereParams, parseInt(perPage), offset];

  db.query(sqlCount, whereParams, (err, countResult) => {
    if (err) return res.status(500).json({ error: "Database error" });
    const total = countResult[0].total;

    db.query(sqlData, dataParams, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ data: results, total });
    });
  });
});

function getFolderStructure(dirPath, baseUrl = "/uploads/departmental-docs") {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  return items.map((item) => {
    const fullPath = path.join(dirPath, item.name);
    const relativePath = path.relative(
      path.join(__dirname, "uploads", "departmental-docs"),
      fullPath
    );
    const url = `${baseUrl}/${relativePath.replace(/\\/g, "/")}`;
    if (item.isDirectory()) {
      return {
        name: item.name,
        type: "folder",
        children: getFolderStructure(fullPath, baseUrl),
      };
    } else {
      return {
        name: item.name,
        type: "file",
        url: `/api/download?filepath=${encodeURIComponent(
          path.join("departmental-docs", relativePath)
        )}&filename=${encodeURIComponent(item.name)}`,
      };
    }
  });
}

app.get("/api/departmental-docs", (req, res) => {
  const department = req.query.department;
  const baseDir = path.join(__dirname, "uploads", "departmental-docs");
  const targetDir = department ? path.join(baseDir, department) : baseDir;

  if (!fs.existsSync(targetDir)) {
    return res.status(404).json({ error: "Documents folder not found." });
  }

  try {
    const structure = getFolderStructure(targetDir);
    res.json(structure);
  } catch (err) {
    console.error("Error reading departmental docs:", err);
    res.status(500).json({ error: "Unable to read departmental documents." });
  }
});

// Gallery events
app.get("/api/gallery/events", (req, res) => {
  const galleryPath = path.join(__dirname, "uploads", "galleryimgs");
  if (!fs.existsSync(galleryPath))
    return res.status(404).json({ error: "Gallery folder not found." });

  const folders = fs
    .readdirSync(galleryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  res.json(folders);
});

// Gallery images
app.get("/api/gallery/images/:eventName", async (req, res) => {
  try {
    const eventName = decodeURIComponent(req.params.eventName);
    const folderPath = path.join(__dirname, "uploads/galleryimgs", eventName);
    if (!fs.existsSync(folderPath))
      return res.status(404).json({ error: "Event folder not found" });

    const files = await fs.promises.readdir(folderPath);
    const imageUrls = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map((file) => `/uploads/galleryimgs/${eventName}/${file}`);

    res.json(imageUrls);
  } catch (error) {
    console.error("Failed to load images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
