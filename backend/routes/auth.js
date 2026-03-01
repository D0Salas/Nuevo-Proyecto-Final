const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan credenciales" });
    }

    db.query("SELECT * FROM admins WHERE email = ? LIMIT 1", [email], async (err, rows) => {
      if (err) {
        console.error("DB error /auth/login:", err);
        return res.status(500).json({ message: "Error de servidor" });
      }

      if (!rows || rows.length === 0) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }

      const admin = rows[0];

      const ok = await bcrypt.compare(password, admin.password);
      if (!ok) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }

      const secret = process.env.JWT_SECRET || "SUPER_SECRET_KEY";

      const token = jwt.sign(
        { id: admin.id, email: admin.email, role: "admin" },
        secret,
        { expiresIn: "2h" }
      );

      return res.json({ token });
    });
  } catch (e) {
    console.error("Error /auth/login:", e);
    return res.status(500).json({ message: "Error de servidor" });
  }
});

module.exports = router;
