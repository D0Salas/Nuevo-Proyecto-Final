const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// GET
router.get("/", auth,(req,res)=>{
  db.query("SELECT * FROM usuarios",(e,r)=>res.json(r));
});

// CREATE
router.post("/", auth,(req,res)=>{
  db.query("INSERT INTO usuarios SET ?",req.body,
    ()=>res.sendStatus(200));
});

// UPDATE
router.put("/:id", auth,(req,res)=>{
  db.query(
    "UPDATE usuarios SET ? WHERE id=?",
    [req.body,req.params.id],
    ()=>res.sendStatus(200)
  );
});

// DELETE
router.delete("/:id", auth,(req,res)=>{
  db.query(
    "DELETE FROM usuarios WHERE id=?",
    [req.params.id],
    ()=>res.sendStatus(200)
  );
});

module.exports = router;