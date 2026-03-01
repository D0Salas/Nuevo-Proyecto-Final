const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {

  const { email, password } = req.body;

  console.log("Login attempt:", email);

  db.query(
    "SELECT * FROM admins WHERE email = ?",
    [email],
    async (err, results) => {

      if (err) {
        console.error("MYSQL ERROR:", err);
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      const user = results[0];

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(401).json({ error: "Password incorrecto" });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );

      res.json({ token });
    }
  );
});
