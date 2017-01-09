const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
  title: String,
  description: String,
  start: String,
  end: String
});

module.exports = mongoose.model('Events', EventsSchema);