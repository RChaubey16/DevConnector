const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get the token from request headers
  const token = req.header("x-auth-token");

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next(); // To the next middleware
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
