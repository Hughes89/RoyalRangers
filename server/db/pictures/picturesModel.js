const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema({
  title: String,
  code: String
});

module.exports = mongoose.model('Pictures', PictureSchema);