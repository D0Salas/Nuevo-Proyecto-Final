const mysql = require("mysql2");

// Verificar que exista la variable de entorno
if (!process.env.MYSQL_URL) {
  console.error("❌ MYSQL_URL no está definida en las variables de entorno");
  process.exit(1);
}

// Crear conexión usando Railway URL
const db = mysql.createConnection(process.env.MYSQL_URL);

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
    return;
  }

  console.log("✅ Conectado a MySQL (Railway)");
});

module.exports = db;
