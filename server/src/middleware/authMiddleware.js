const { verifyToken } = require('../utils/jwt');

/**
 * Middleware to verify JWT token and attach user info to request
 * Usage: app.use(protect) or app.get('/route', protect, controller)
 */
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is missing or invalid',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is missing',
      });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

/**
 * Middleware to allow access only to admin users
 * Must be used after protect middleware
 * Usage: app.get('/admin-route', protect, adminOnly, controller)
 */
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access only',
    });
  }
  next();
};

module.exports = {
  protect,
  adminOnly,
};
