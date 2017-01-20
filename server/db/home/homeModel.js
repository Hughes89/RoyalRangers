const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  content: String,
  banner: String
});

module.exports = mongoose.model('Home', HomeSchema);