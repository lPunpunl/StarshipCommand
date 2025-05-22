const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
    const {
        user,
        password,
    } = req.body;

    if (!user) res.status(400).send({ error:"RequiredField", message: "El usuario es requerido." });
    if (!password) res.status(400).send({ error: "RequiredField", message: "La contraseña es requerida." });

    // 1. Verificar si el usuario ya existe
    const existingUser = await User.findOne({ user: user.toLowerCase() }); // Búsqueda case-insensitive
    if (existingUser) {
        return res.status(409).send({ error:"ExistingUsername", message: "Nombre de usuario ya en uso." }); // 409 = Conflict
    }

    //hasheo de password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const createUser = new User({
        user: user.toLowerCase(),
        password: hashPassword,
    }); 

    try {
        createUser.save((error, userStorage) => {
        if (error) {
            console.log(error);
            res.status(400).send({ error:"ErrorSaving", message: "Error de la base de datos creando el usuario." });
        } else {
            userStorage.password = undefined;
            res.status(200).send({
            message: "Usuario Registrado.", userStorage
            });
    }
    });
    } catch (error) {
        console.error("Error in creating user: ", error);
        res.status(500).send({  error:"InternalServerError", message: "Error interno del servidor, intenta más tarde." });
    }
}

async function editUser(req, res) {
    const { user, password, newUser, newPassword } = req.body;

    // Validaciones básicas
    if (!user) return res.status(400).send({ error: "RequiredField", message: "El usuario actual es requerido." });
    if (!password) return res.status(400).send({ error: "RequiredField", message: "La contraseña actual es requerida." });
    if (!newUser && !newPassword) {
        return res.status(400).send({ error: "RequiredField", message: "Se requiere de al menos un nuevo nombre de usuario o una nueva contraseña." });
    }

    try {
        // 1. Buscar y autenticar el usuario existente
        const existingUser = await User.findOne({ user: user.toLowerCase() });
        if (!existingUser) {
            return res.status(404).send({ error:"UserNotFound", message: "Usuario no encontrado." });
        }

        // 2. Verificar la contraseña actual
        const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).send({ error:"AuthenticationFailed", message: "Error de autenticación." });
        }

        // 3. Verificar si el nuevo username ya existe (solo si se está cambiando)
        if (newUser && newUser.toLowerCase() !== existingUser.user) {
            const userExists = await User.findOne({ user: newUser.toLowerCase() });
            if (userExists) {
                return res.status(409).send({ error:"ExistingUsername", message: "Nombre de usuario ya en uso." });
            }
        }

        // 4. Preparar los datos a actualizar
        const updateData = {};
        if (newUser) updateData.user = newUser.toLowerCase();
        if (newPassword) {
            const salt = bcrypt.genSaltSync(10);
            updateData.password = bcrypt.hashSync(newPassword, salt);
        }

        // 5. Actualizar el usuario
        const updatedUser = await User.findOneAndUpdate(
            { user: user.toLowerCase() },
            updateData,
            { 
                new: true,
                runValidators: true // Ejecuta las validaciones del schema
            }
        ).select('-password -__v'); // Excluir campos sensibles

        if (!updatedUser) {
            return res.status(500).send({ error:"DatabaseError", message: "Error actualizando el usuario." });
        }

        return res.status(200).send({
            success: true,
            message: "Los cambios se guardaron correctamente."
        });

    } catch (error) {
        console.error("Error in user update:", error);
        res.status(500).send({  error:"InternalServerError", message: "Error interno del servidor, intenta más tarde." });
    }
}

async function getUsers(req, res) {
  try {
      // Buscar todos los usuarios excluyendo campos sensibles
      const users = await User.find({})
          .select('-password -__v') // Excluir password y versión
          .lean(); // Convertir a objeto JavaScript simple (opcional)

      if (!users || users.length === 0) {
          return res.status(404).send({ msg: "No users found" });
      }

      res.status(200).send({
          msg: "Users retrieved successfully",
          count: users.length,
          users: users
      });

  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send({ 
          msg: "Internal server error"
      });
  }
}

async function deleteUser(req, res) {
  const { user, password } = req.body;

  // Validaciones básicas
  if (!user) return res.status(400).send({ msg: "Username is required" });
  if (!password) return res.status(400).send({ msg: "Password is required for verification" });

  try {
      // 1. Buscar el usuario
      const existingUser = await User.findOne({ user: user.toLowerCase() });
      if (!existingUser) {
          return res.status(404).send({ msg: "User not found" });
      }

      // 2. Verificar la contraseña
      const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
      if (!isPasswordValid) {
          return res.status(401).send({ msg: "Invalid password" });
      }

      // 3. Eliminar el usuario
      const deletedUser = await User.findOneAndDelete({ user: user.toLowerCase() })
          .select('-password -__v'); // Excluir datos sensibles

      if (!deletedUser) {
          return res.status(400).send({ msg: "Error deleting user" });
      }

      res.status(200).send({
          msg: "User deleted successfully",
          deletedUser: {
              username: deletedUser.user,
              createdAt: deletedUser.createdAt
              // Otros campos no sensibles que quieras incluir
          }
      });

  } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send({ 
          msg: "Internal server error",
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
}

module.exports = {
    createUser,
    editUser,
    getUsers,
    deleteUser
}