const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  content: String
});

module.exports = mongoose.model('Home', HomeSchema);