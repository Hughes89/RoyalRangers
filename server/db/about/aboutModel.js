const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  content: String
});

module.exports = mongoose.model('About', AboutSchema);