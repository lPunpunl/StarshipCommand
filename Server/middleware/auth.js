const jwt = require("../utils/jwt");

function authUser(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(400)
      .send({ msg: "Error, no se encuentra la cabecera de autorizacion" });
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const payload = jwt.decode(token);
    const { exp } = payload;
    const currentDate = new Date().getTime();

    if (exp <= currentDate) {
      return res.status(400).send({ msg: "Token ha expirado" });
    }

    return next();
  } catch (error) {
    return res.status(400).send({ msg: "Error en la autorizacion" });
  }
}

module.exports = {
  authUser,
};