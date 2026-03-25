const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Create database
const db = new sqlite3.Database("data.db");

// Create table
db.run("CREATE TABLE IF NOT EXISTS messages (name TEXT, message TEXT)");

// Save data
app.post("/save", (req, res) => {
  const { name, message } = req.body;
  db.run("INSERT INTO messages VALUES (?, ?)", [name, message]);
  res.send("Saved");
});

// Get data
app.get("/messages", (req, res) => {
  db.all("SELECT * FROM messages", [], (err, rows) => {
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});