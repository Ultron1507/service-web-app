const Notification = require('../models/Notification');

exports.listNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.userId }).sort({ createdAt: -1 }).populate('booking');
    res.json({ success: true, data: { notifications } });
  } catch (error) { next(error); }
};

exports.readNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
    if (notification.recipient.toString() !== req.user.userId) return res.status(403).json({ success: false, message: 'You cannot access this notification' });
    notification.isRead = true;
    await notification.save();
    res.json({ success: true, data: { notification } });
  } catch (error) { next(error); }
};

exports.readAll = async (req, res, next) => {
  try {
    await Notification.updateMany({ recipient: req.user.userId, isRead: false }, { isRead: true });
    res.json({ success: true });
  } catch (error) { next(error); }
};
