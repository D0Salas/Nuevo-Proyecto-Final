const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

router.post("/login", async (req,res)=>{

  const { email, password } = req.body;

  try{

    const result = await db.query(
      "SELECT * FROM admins WHERE email=$1",
      [email]
    );

    if(result.rows.length === 0)
      return res.status(401).json({message:"invalid"});

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if(!valid)
      return res.status(401).json({message:"invalid"});

    const token = jwt.sign(
      { id:user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn:"2h" }
    );

    res.json({token});

  }
  catch(err){
    console.error(err);
    res.status(500).json({message:"server error"});
  }

});

module.exports = router;
