const User = require('../models/User');
const Otp = require('../models/Otp');
const { generateOtp, hashOtp, compareOtp, calculateOtpExpiration, normalizePhoneNumber } = require('../utils/otp');
const { generateToken } = require('../utils/jwt');

/**
 * Send OTP to phone number
 * POST /api/auth/send-otp
 * Body: { phone: "XXXXXXXXXX" }
 */
const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    // Validate phone number
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required',
      });
    }

    // Normalize phone number
    const normalizedPhone = normalizePhoneNumber(phone);

    // Validate normalized phone number format
    if (!normalizedPhone || normalizedPhone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format. Please provide a 10-digit phone number',
      });
    }

    // Check if this is an admin phone number
    const adminPhone = process.env.ADMIN_PHONE;
    if (!adminPhone) {
      return res.status(500).json({
        success: false,
        message: 'Admin phone not configured on the server',
      });
    }

    const isAdminPhone = normalizedPhone === normalizePhoneNumber(adminPhone);

    // Admin phone can send OTP
    if (!isAdminPhone) {
      return res.status(403).json({
        success: false,
        message: 'Only authorized admin phone number can access this service',
      });
    }

    // Check for OTP cooldown (60 seconds between OTP requests)
    const recentOtp = await Otp.findOne({ phone: normalizedPhone });
    if (recentOtp) {
      const timeDifference = new Date() - recentOtp.createdAt;
      const secondsElapsed = timeDifference / 1000;

      if (secondsElapsed < 60) {
        const waitTime = Math.ceil(60 - secondsElapsed);
        return res.status(429).json({
          success: false,
          message: `Please wait ${waitTime} seconds before requesting a new OTP`,
        });
      }

      // Delete old OTP record
      await Otp.deleteOne({ phone: normalizedPhone });
    }

    // Generate OTP
    const otp = generateOtp();
    const otpHash = await hashOtp(otp);
    const expiresAt = calculateOtpExpiration(parseInt(process.env.OTP_EXPIRY_MINUTES) || 5);

    // Store OTP in database
    await Otp.create({
      phone: normalizedPhone,
      otpHash,
      expiresAt,
      attempts: 0,
    });

    // Response
    const response = {
      success: true,
      message: 'OTP generated successfully',
    };

    // Include OTP only in development
    if (process.env.NODE_ENV === 'development') {
      response.devOtp = otp;
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error('Send OTP error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate OTP. Please try again',
    });
  }
};

/**
 * Verify OTP and return JWT
 * POST /api/auth/verify-otp
 * Body: { phone: "XXXXXXXXXX", otp: "123456" }
 */
const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Validate inputs
    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and OTP are required',
      });
    }

    // Normalize phone number
    const normalizedPhone = normalizePhoneNumber(phone);

    // Validate normalized phone number format
    if (!normalizedPhone || normalizedPhone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format',
      });
    }

    // Validate OTP format
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP format. OTP must be 6 digits',
      });
    }

    // Find OTP record
    const otpRecord = await Otp.findOne({ phone: normalizedPhone });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP',
      });
    }

    // Check if OTP has expired
    if (new Date() > otpRecord.expiresAt) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({
        success: false,
        message: 'OTP has expired',
      });
    }

    // Check if max attempts reached (5 attempts)
    if (otpRecord.attempts >= 5) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({
        success: false,
        message: 'Too many OTP verification attempts. Please request a new OTP',
      });
    }

    // Verify OTP
    const isOtpValid = await compareOtp(otp, otpRecord.otpHash);

    if (!isOtpValid) {
      // Increment attempts
      otpRecord.attempts += 1;
      await otpRecord.save();

      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
      });
    }

    // OTP is valid, delete it
    await Otp.deleteOne({ _id: otpRecord._id });

    // Determine user role
    const adminPhone = process.env.ADMIN_PHONE;
    const isAdminPhone = normalizedPhone === normalizePhoneNumber(adminPhone);
    const userRole = isAdminPhone ? 'admin' : 'customer';

    // Find or create user
    let user = await User.findOne({ phone: normalizedPhone });

    if (!user) {
      user = await User.create({
        phone: normalizedPhone,
        role: userRole,
        isActive: true,
      });
    } else {
      // Update role to admin if admin phone and role is customer
      if (isAdminPhone && user.role !== 'admin') {
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

    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
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
    console.error('Verify OTP error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify OTP. Please try again',
    });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
};
