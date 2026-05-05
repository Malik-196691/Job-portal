const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports.isLoggedIn = function isLoggedIn(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "No token provided" });
  try {
    jwt.verify(token, secret, (err, user) => {
      if (err) return res.status(403).json({ success: false, message: "token is invalid or expired" });
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(403).json({ success: false, message: "token is invalid or expired" });
  }
};

module.exports.isAdmin = function isAdmin(req, res, next) {
  if (req.user.role !== "admin") return res.status(403).json({ success: false, message: "user is not authorized to perform this action" });
  next();
};
