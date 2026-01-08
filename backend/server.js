const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/submit", async (req, res) => {
  const { name, phone, email } = req.body;

  try {
    await pool.query(
      "INSERT INTO users (name, phone, email) VALUES ($1, $2, $3)",
      [name, phone, email]
    );

    res.status(200).json({ message: "Data stored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
