const jwt = require("jsonwebtoken");

const accessTokenSecretKey = "testing-secret-joblyst-app";

function generateAccessToken(userPayload) {
  return jwt.sign(userPayload, accessTokenSecretKey, {
    expiresIn: "10m",
  });
}

module.exports = generateAccessToken;