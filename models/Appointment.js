const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  assigned_user: { type: String }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
