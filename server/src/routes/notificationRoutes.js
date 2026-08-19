const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const notification = require('../controllers/notificationController');

router.use(protect);
router.get('/', notification.listNotifications);
router.patch('/read-all', notification.readAll);
router.patch('/:id/read', notification.readNotification);

module.exports = router;
