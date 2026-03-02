const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", async (req,res)=>{

  try{
    const result = await db.query("SELECT * FROM usuarios");
    res.json(result.rows);
  }
  catch(err){
    console.error(err);
    res.status(500).json({message:"error"});
  }

});

router.post("/", async (req,res)=>{

  const { nombre,email,rol } = req.body;

  try{
    await db.query(
      "INSERT INTO usuarios(nombre,email,rol) VALUES($1,$2,$3)",
      [nombre,email,rol]
    );

    res.json({message:"created"});
  }
  catch(err){
    console.error(err);
    res.status(500).json({message:"error"});
  }

});

module.exports = router;
