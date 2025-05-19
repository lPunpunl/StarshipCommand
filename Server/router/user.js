const express = require("express");
const user = require("../controllers/user");
const { authUser } = require('../middleware/auth');

const api = express.Router();

api.post("/user/create", user.createUser);
api.patch("/user/edit", [authUser], user.editUser);
api.get("/user/getAll", user.getUsers);
api.delete("/user/delete", [authUser], user.deleteUser);
module.exports = api;