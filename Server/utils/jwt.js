const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

function createAccessToken(user) {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 2);

  const payload = {
    token_type: "access",
    iat: Date.now(),
    exp: expToken.getTime(),
    user,
  };

  return jwt.sign(payload, process.env.SECRET_KEY);
}

function decode(token) {
  return jwt.decode(token, process.env.SECRET_KEY, true);
}

module.exports = {
  createAccessToken,
  decode
};