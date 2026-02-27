const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

app.listen(3000, ()=> console.log("API running"));

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