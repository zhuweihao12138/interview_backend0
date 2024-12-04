const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rated_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rate: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
