const jwt = require("jsonwebtoken");

function authenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    next(new Error("Token not found"));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    next(new Error("Token is required"));
  }

  const decodedToken = jwt.decode(token, { complete: true });
  if (!decodedToken) {
    next(new Error("Token is invalid"));
  }
  const user = {
    email: decodedToken.payload.email
  }

  req.user = user;
  return next();
}

module.exports = authenticationToken;