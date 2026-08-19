const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  preferredTime: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  status: { type: String, enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'], default: 'pending', index: true },
  confirmedAt: Date,
  serviceDeadline: Date,
  startedAt: Date,
  completedAt: Date,
  cancelledAt: Date,
  cancellationReason: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
