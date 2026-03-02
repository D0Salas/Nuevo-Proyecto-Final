const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(
  path.join(__dirname, "../public")
));

/* ===========================
   TEST DATABASE
=========================== */

app.get("/test-db", async (req,res)=>{

  try{
    const result = await db.query("SELECT NOW()");
    res.json({
      status:"success",
      time: result.rows[0]
    });
  }
  catch(err){
    console.error(err);
    res.status(500).json({status:"error"});
  }

});

/* ===========================
   ROUTES
=========================== */

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

/* ===========================
   START SERVER
=========================== */

const PORT = process.env.PORT || 10000;

app.listen(PORT, ()=>{
  console.log("API running on port", PORT);
});
