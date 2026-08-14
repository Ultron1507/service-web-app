const crypto = require('crypto');
const bcrypt = require('bcryptjs');

/**
 * Generate a random 6-digit OTP using cryptographically secure random generation
 * @returns {string} 6-digit OTP
 */
const generateOtp = () => {
  const otp = crypto.randomInt(100000, 999999);
  return otp.toString();
};

/**
 * Hash the OTP using bcrypt
 * @param {string} otp - The OTP to hash
 * @returns {Promise<string>} The hashed OTP
 */
const hashOtp = async (otp) => {
  const saltRounds = 10;
  return await bcrypt.hash(otp, saltRounds);
};

/**
 * Compare entered OTP with stored hash
 * @param {string} otp - The OTP entered by user
 * @param {string} otpHash - The hashed OTP stored in database
 * @returns {Promise<boolean>} True if OTP matches, false otherwise
 */
const compareOtp = async (otp, otpHash) => {
  return await bcrypt.compare(otp, otpHash);
};

/**
 * Calculate OTP expiration time
 * @param {number} expiryMinutes - Number of minutes until OTP expires
 * @returns {Date} The expiration date/time
 */
const calculateOtpExpiration = (expiryMinutes) => {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes);
  return expiresAt;
};

/**
 * Normalize phone number (remove spaces, dashes, etc.)
 * @param {string} phone - The phone number to normalize
 * @returns {string} Normalized phone number
 */
const normalizePhoneNumber = (phone) => {
  return phone.replace(/\D/g, '').slice(-10);
};

module.exports = {
  generateOtp,
  hashOtp,
  compareOtp,
  calculateOtpExpiration,
  normalizePhoneNumber,
};
