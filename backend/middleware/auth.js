const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.headers.authorization || "";

  // Soporta: "Bearer TOKEN" o "TOKEN"
  const token = header.startsWith("Bearer ") ? header.slice(7) : header;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    const secret = process.env.JWT_SECRET || "SUPER_SECRET_KEY";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(403).json({ message: "Token inválido" });
  }
};
