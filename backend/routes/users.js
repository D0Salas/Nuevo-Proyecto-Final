const express = require("express");
const db = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

function q(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });
}

router.get("/", auth, async (req, res) => {
  try {
    const rows = await q("SELECT id, nombre, email, rol FROM usuarios ORDER BY id DESC");
    res.json(rows);
  } catch (e) {
    console.error("GET /users ERROR:", e);
    res.status(500).json({ message: "Error obteniendo usuarios" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { nombre, email, rol } = req.body || {};
    if (!nombre || !email || !rol) return res.status(400).json({ message: "Datos incompletos" });

    await q(
      "INSERT INTO usuarios (nombre, email, rol) VALUES (?, ?, ?)",
      [nombre, email, rol]
    );

    res.sendStatus(201);
  } catch (e) {
    console.error("POST /users ERROR:", e);
    res.status(500).json({ message: "Error creando usuario" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { nombre, email, rol } = req.body || {};
    const { id } = req.params;

    if (!nombre || !email || !rol) return res.status(400).json({ message: "Datos incompletos" });

    await q(
      "UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?",
      [nombre, email, rol, id]
    );

    res.sendStatus(200);
  } catch (e) {
    console.error("PUT /users/:id ERROR:", e);
    res.status(500).json({ message: "Error actualizando usuario" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await q("DELETE FROM usuarios WHERE id = ?", [id]);
    res.sendStatus(200);
  } catch (e) {
    console.error("DELETE /users/:id ERROR:", e);
    res.status(500).json({ message: "Error eliminando usuario" });
  }
});

module.exports = router;
