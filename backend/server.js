const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// SERVIR FRONTEND
app.use(express.static(path.join(__dirname,"../public")));

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

app.listen(3000,()=>console.log("API running on 3000"));
