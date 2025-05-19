const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {
    unique: true,
    type: String
  },
  password: String
});

module.exports = mongoose.model("user", userSchema);