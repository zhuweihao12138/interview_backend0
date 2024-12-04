const jwt = require('jsonwebtoken');
const config = require('../config/secret');

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "未授权。" });

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token 无效。" });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
