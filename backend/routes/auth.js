const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

function q(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });
}

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Faltan credenciales" });

    const rows = await q("SELECT * FROM admins WHERE email = ? LIMIT 1", [email]);
    if (!rows || rows.length === 0) return res.status(401).json({ message: "Credenciales incorrectas" });

    const admin = rows[0];
    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(401).json({ message: "Credenciales incorrectas" });

    const secret = process.env.JWT_SECRET || "SUPER_SECRET_KEY";
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: "admin" },
      secret,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (e) {
    console.error("AUTH LOGIN ERROR:", e);
    res.status(500).json({ message: "Error de servidor" });
  }
});

module.exports = router;
