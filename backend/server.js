const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();

const ORIGIN =
  process.env.CORS_ORIGIN ||
  (process.env.NODE_ENV === "production"
    ? "https://nuevo-proyecto-final.onrender.com"
    : "http://localhost:3000");

app.use(cors({ origin: ORIGIN }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

app.get("/test-db", (req, res) => {
  db.query("SELECT NOW() AS time", (err, rows) => {
    if (err) {
      console.error("TEST-DB ERROR:", err);
      return res.status(500).json({ status: "error", message: err.message });
    }
    res.json({ status: "success", database_time: rows[0].time });
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
