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

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
