const mongoose = require("mongoose");

const agendaSchema = new mongoose.Schema({
  user_id: String,
  time: String,
  day: String,
  month: String,
  year: String,
  description: String
  
});

module.exports = mongoose.model("agenda", agendaSchema);