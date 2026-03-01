const mysql = require("mysql2");

function getPool() {
  if (process.env.MYSQL_URL) {
    return mysql.createPool(process.env.MYSQL_URL);
  }

  const host = process.env.MYSQLHOST || process.env.DB_HOST;
  const user = process.env.MYSQLUSER || process.env.DB_USER;
  const password = process.env.MYSQLPASSWORD || process.env.DB_PASSWORD;
  const port = Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306);
  const database =
    process.env.MYSQLDATABASE ||
    process.env.DB_NAME ||
    process.env.MYSQL_DB ||
    "railway";

  return mysql.createPool({
    host,
    user,
    password,
    port,
    database,
    ssl: process.env.MYSQL_SSL === "true" ? { rejectUnauthorized: false } : undefined
  });
}

const pool = getPool();
module.exports = pool;
