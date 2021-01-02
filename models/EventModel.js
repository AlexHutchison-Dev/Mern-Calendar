const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: String,
});

module.exports = mongoose.model('Event', eventSchema);