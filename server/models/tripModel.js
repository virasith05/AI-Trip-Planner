const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // links to logged-in user

  itinerary: {
    title: String,
    details: String
  },

  hotel: {
    name: String,           // Short name (e.g., "Generator Paris")
    desc: String,           // Short description
    fullDetails: Object     // Full AI-generated hotel object (nested with name, description, price, notes etc.)
  },

  raw: Object,              // Full AI response (optional)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);
