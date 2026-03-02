const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PASSWORD",
  database: "user_manager"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
    return;
  }
  console.log("✅ MySQL conectado correctamente");
});

module.exports = db;
