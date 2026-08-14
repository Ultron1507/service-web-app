/**
 * Normalize phone number to a consistent internal format
 * Supports formats:
 * - 9876543210 (10-digit)
 * - +919876543210 (with country code)
 * - 919876543210 (country code without +)
 * 
 * Returns: 10-digit number without country code
 * 
 * @param {string} phone - The phone number to normalize
 * @returns {string} Normalized 10-digit phone number
 */
const normalizePhoneNumber = (phone) => {
  if (!phone) return '';

  // Remove all non-digit characters
  let normalized = phone.replace(/\D/g, '');

  // If starts with 91 (India country code) and is longer than 10, remove it
  if (normalized.startsWith('91') && normalized.length > 10) {
    normalized = normalized.slice(2);
  }

  // Return last 10 digits
  return normalized.slice(-10);
};

/**
 * Format phone number for display (Indian format)
 * Converts 9876543210 to +919876543210
 * 
 * @param {string} phone - The 10-digit phone number
 * @returns {string} Formatted phone number with country code
 */
const formatPhoneNumber = (phone) => {
  const normalized = normalizePhoneNumber(phone);
  
  if (normalized.length !== 10) {
    return phone; // Return original if normalization failed
  }

  return `+91${normalized}`;
};

/**
 * Validate if phone number is in valid format
 * Must be 10 digits
 * 
 * @param {string} phone - The phone number to validate
 * @returns {boolean} True if valid, false otherwise
 */
const isValidPhoneNumber = (phone) => {
  const normalized = normalizePhoneNumber(phone);
  return normalized.length === 10 && /^\d{10}$/.test(normalized);
};

module.exports = {
  normalizePhoneNumber,
  formatPhoneNumber,
  isValidPhoneNumber,
};
