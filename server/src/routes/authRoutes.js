const express = require('express');
const { sendOtp, verifyOtp } = require('../controllers/authController');

const router = express.Router();

/**
 * POST /api/auth/send-otp
 * Send OTP to admin phone number
 */
router.post('/send-otp', sendOtp);

/**
 * POST /api/auth/verify-otp
 * Verify OTP and return JWT token
 */
router.post('/verify-otp', verifyOtp);

module.exports = router;
