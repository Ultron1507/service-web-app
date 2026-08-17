const User = require('../models/User');
const mongoose = require('mongoose');
const { normalizePhoneNumber, isValidPhoneNumber } = require('../utils/phone');
const { generateToken } = require('../utils/jwt');

/**
 * Check if phone number is the configured admin phone
 * @param {string} phone - Phone number to check (will be normalized)
 * @returns {boolean} True if phone matches admin phone
 */
const isAdminPhone = (phone) => {
  const adminPhone = process.env.ADMIN_PHONE;
  
  if (!adminPhone) {
    return false;
  }

  const normalizedPhone = normalizePhoneNumber(phone);
  const normalizedAdminPhone = normalizePhoneNumber(adminPhone);

  return normalizedPhone === normalizedAdminPhone;
};

/**
 * Login with phone number
 * POST /api/auth/login
 * Body: { phone: "XXXXXXXXXX" }
 * 
 * Supports various phone formats:
 * - 9876543210
 * - +919876543210
 * - 919876543210
 */
const login = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.error('Login unavailable: MongoDB is not connected');
      return res.status(503).json({
        success: false,
        message: 'Service is temporarily unavailable. Please try again.',
      });
    }

    const { phone } = req.body;

    // Validate phone number is provided
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required',
      });
    }

    // Validate phone number format
    if (!isValidPhoneNumber(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number',
      });
    }

    // Normalize phone number
    const normalizedPhone = normalizePhoneNumber(phone);

    // Determine user role based on admin phone
    const isAdmin = isAdminPhone(normalizedPhone);
    const userRole = isAdmin ? 'admin' : 'customer';

    // Find existing user or create new one
    let user = await User.findOne({ phone: normalizedPhone });

    if (!user) {
      // Create new user
      user = await User.create({
        phone: normalizedPhone,
        role: userRole,
        isActive: true,
      });
    } else {
      // Update role if admin phone
      if (isAdmin && user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
      }
    }

    // Generate JWT
    const token = generateToken({
      userId: user._id.toString(),
      phone: user.phone,
      role: user.role,
    });

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          phone: user.phone,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', {
      name: error.name,
      code: error.code,
      message: error.message,
    });
    return res.status(500).json({
      success: false,
      message: 'Login failed. Please try again',
    });
  }
};

module.exports = {
  login,
};
