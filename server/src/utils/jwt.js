const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token
 * @param {object} payload - The data to encode in the token (userId, role, etc.)
 * @returns {string} The JWT token
 */
const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Verify and decode a JWT token
 * @param {string} token - The JWT token to verify
 * @returns {object} The decoded payload
 * @throws {Error} If token is invalid or expired
 */
const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error(`Token verification failed: ${error.message}`);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
