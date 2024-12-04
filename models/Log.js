const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;
