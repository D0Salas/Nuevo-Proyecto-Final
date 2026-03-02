const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login",(req,res)=>{

  const {email,password} = req.body;

  db.query(
    "SELECT * FROM admins WHERE email=?",
    [email],
    async (err,result)=>{

      if(err) return res.status(500).send(err);

      if(!result.length)
        return res.status(401).json({message:"Usuario no encontrado"});

      const admin = result[0];

      const valid = await bcrypt.compare(password,admin.password);

      if(!valid)
        return res.status(401).json({message:"Password incorrecto"});

      const token = jwt.sign(
        {id:admin.id,email:admin.email},
        "SUPER_SECRET_KEY",
        {expiresIn:"8h"}
      );

      res.json({token});
    }
  );
});

module.exports = router;
