const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){

  const token = req.headers.authorization;

  if(!token)
    return res.status(401).json({message:"No autorizado"});

  try{
    const decoded = jwt.verify(token,"SUPER_SECRET_KEY");
    req.user = decoded;
    next();
  }
  catch{
    res.status(403).json({message:"Token inválido"});
  }
};