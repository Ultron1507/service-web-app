const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();

/**
 * POST /api/auth/login
 * Login with phone number
 * Body: { phone: "XXXXXXXXXX" }
 */
router.post('/login', login);

module.exports = router;
