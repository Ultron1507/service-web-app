const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const booking = require('../controllers/bookingController');
router.post('/', protect, booking.createBooking);
router.get('/my', protect, booking.myBookings);
router.get('/:id', protect, booking.getBooking);
module.exports = router;
