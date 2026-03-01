const mysql = require("mysql2");

// Opción 1: un solo URL tipo:
// mysql://user:pass@host:port/db
if (process.env.MYSQL_URL) {
  const pool = mysql.createPool(process.env.MYSQL_URL);
  module.exports = pool;
  return;
}

// Opción 2: variables separadas (Railway suele dar estas)
const host = process.env.MYSQLHOST || process.env.MYSQL_HOST;
const user = process.env.MYSQLUSER || process.env.MYSQL_USER;
const password = process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD;
const port = process.env.MYSQLPORT || process.env.MYSQL_PORT || 3306;

// IMPORTANTE: usa el nombre real de tu DB en Railway.
// Si tu dump lo importaste a "railway", déjalo así.
const database =
  process.env.MYSQLDATABASE ||
  process.env.MYSQL_DATABASE ||
  process.env.MYSQL_DB ||
  "railway";

const pool = mysql.createPool({
  host,
  user,
  password,
  database,
  port,
  // Railway a veces requiere SSL según el plan; si te falla, activa ssl:
  // ssl: { rejectUnauthorized: false },
});

module.exports = pool;
