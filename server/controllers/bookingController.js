import Booking from '../models/Booking.js'

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body)
    res.status(201).json({ success: true, booking })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
