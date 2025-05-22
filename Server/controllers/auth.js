const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");

async function login(req, res) {
  const { user, password } = req.body;

  if (!user) res.status(400).send({ error:"RequiredField", message: "El usuario es requerido." });
  if (!password) res.status(400).send({ error: "RequiredField", message: "La contraseña es requerida." });

  try {
  const existingUser = await User.findOne({ user });

  if (existingUser === null) {
    res
      .status(404)
      .send({ error:"UserNotFound", message: "Usuario no encontrado" });
  } else {
    bcrypt.compare(
      password,
      existingUser.password,
      (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ error:"InternalServerError", message: "Error interno del servidor, intenta más tarde." });
          console.log(bcryptError);
        } else if (!check) {
          res.status(401).send({ error:"AuthenticationFailed", message: "Error de autenticación." });
        } else {
          existingUser.password = undefined;

          res.status(200).send({
            token: jwt.createAccessToken(existingUser),
            existingUser,
          });
        }
      }
    );
  }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send({  error:"InternalServerError", message: "Error interno del servidor, intenta más tarde." });
  }


}

module.exports = {
  login,
};