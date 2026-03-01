const mysql = require("mysql2");

const connection = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: "user_manager", // 👈 CAMBIAR A ESTO
  port: process.env.MYSQLPORT,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = connection;
