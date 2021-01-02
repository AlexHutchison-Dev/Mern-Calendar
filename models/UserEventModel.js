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

const userEventSchema = new Schema({
  user: {
    type: String,
    required: true,
  },events: [eventSchema],
})

module.exports = mongoose.model('UserEvent', userEventSchema);