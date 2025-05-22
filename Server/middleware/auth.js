const jwt = require("../utils/jwt");

function authUser(req, res, next) {

  const token = req.headers.authorization.split(' ')[1];

  if (token === "null") {
    return res
      .status(401)
      .send({ message: "Error, no se encuentra la cabecera de autorización." });
  }

  try {
    const payload = jwt.decode(token);
    const { exp } = payload;
    const currentDate = new Date().getTime();

    if (exp <= currentDate) {
      return res.status(401).send({ message: "El token ha expirado." });
    }

    return next();
  } catch (error) {
    return res.status(500).send({ message: "Error interno del servidor, autorización fallida." });
  }
}

module.exports = {
  authUser,
};