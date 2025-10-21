const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  tags: {
    type: [String], // ✅ Accepts an array of strings
    default: [],
  },
  banner: {
    type: String, // URL or path to the image
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Event', eventSchema);
