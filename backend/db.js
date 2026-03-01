const mysql = require("mysql2");

const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection failed:");
    console.error(err);
  } else {
    console.log("✅ Connected to Railway MySQL");
  }
});

module.exports = db;
