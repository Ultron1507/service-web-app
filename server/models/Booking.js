import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  service: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Booking', bookingSchema)
