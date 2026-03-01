const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : header;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    const secret = process.env.JWT_SECRET || "SUPER_SECRET_KEY";
    req.user = jwt.verify(token, secret);
    next();
  } catch (e) {
    return res.status(403).json({ message: "Token inválido" });
  }
};
