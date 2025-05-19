const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");

async function login(req, res) {
  const { user, password } = req.body;

  if (!user) res.status(400).send({ msg: "user is required" });
  if (!password) res.status(400).send({ msg: "password is required" });

  const existingUser = await User.findOne({ user });

  if (existingUser === null) {
    res
      .status(400)
      .send({ msg: "any user was found" });
  } else {
    bcrypt.compare(
      password,
      existingUser.password,
      (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Error del servidor" });
          console.log(bcryptError);
        } else if (!check) {
          res.status(400).send({ msg: "Error en la comprobacion del usuario" });
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
}

module.exports = {
  login,
};