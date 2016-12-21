const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: String
});

module.exports = mongoose.model('Events', EventsSchema);