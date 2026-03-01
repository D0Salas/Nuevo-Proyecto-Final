const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();

/* ================================
   MIDDLEWARE
================================ */

app.use(cors({
  origin: "https://nuevo-proyecto-final.onrender.com",
  credentials: true
}));

app.use(express.json());

app.use(express.static(
  path.join(__dirname, "../public")
));

/* ================================
   DATABASE TEST
================================ */

app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({
      status: "success",
      database_time: result.rows[0]
    });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({
      status: "error",
      message: "Database connection failed"
    });
  }
});

/* ================================
   LOGIN ROUTE
================================ */

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE email=$1 AND password=$2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Credenciales incorrectas"
      });
    }

    res.json({
      message: "Login exitoso",
      user: result.rows[0]
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({
      message: "Error de servidor"
    });
  }
});

/* ================================
   USERS ROUTE (optional)
================================ */

app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error obteniendo usuarios"
    });
  }
});

/* ================================
   SERVER START
================================ */

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
