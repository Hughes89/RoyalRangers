const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;

const PictureSchema = new mongoose.Schema({
  title: String,
  href: String,
  src: String
});



module.exports = mongoose.model('Pictures', UserSchema);