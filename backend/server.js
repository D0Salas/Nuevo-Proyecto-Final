const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");

const app = express();

app.use(cors({
  origin: "https://nuevo-proyecto-final.onrender.com",
  credentials: true
}));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

app.get("/test-db", (req, res) => {
  db.query("SELECT NOW() AS time", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: "error" });
    }

    res.json({
      status: "success",
      database_time: result[0].time
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
