const mongoose = require('mongoose');

const CommandersSchema = new mongoose.Schema({
  name: String,
  title: String,
  email: String,
  about: String,
  picture: String
});

module.exports = mongoose.model('Commanders', CommandersSchema);