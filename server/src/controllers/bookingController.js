const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User');
const Notification = require('../models/Notification');
const mongoose = require('mongoose');

const populated = (query) => query.populate('customer', 'name phone email').populate('service', 'name description isActive');
const sendBooking = (res, booking, message = 'Booking updated successfully') => res.json({ success: true, message, data: { booking } });

exports.createBooking = async (req, res, next) => {
  try {
    const { serviceId, date, preferredTime, address } = req.body;
    if (!serviceId || !date || !preferredTime?.trim() || !address?.trim()) return res.status(400).json({ success: false, message: 'Service, date, preferred time, and address are required' });
    if (!mongoose.isValidObjectId(serviceId)) return res.status(400).json({ success: false, message: 'Invalid service ID' });
    const bookingDate = new Date(date);
    if (Number.isNaN(bookingDate.getTime()) || bookingDate < new Date(new Date().setHours(0, 0, 0, 0))) return res.status(400).json({ success: false, message: 'Please select a valid future date' });
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    if (!service.isActive) return res.status(400).json({ success: false, message: 'This service is currently unavailable' });
    const booking = await Booking.create({ customer: req.user.userId, service: service._id, date: bookingDate, preferredTime: preferredTime.trim(), address: address.trim() });
    const [admins, customer] = await Promise.all([User.find({ role: 'admin', isActive: true }).select('_id'), User.findById(req.user.userId).select('name phone')]);
    if (admins.length) await Notification.insertMany(admins.map((admin) => ({ recipient: admin._id, type: 'new_booking', booking: booking._id, title: 'New Booking', message: `${service.name} booking from ${customer?.name || customer?.phone || 'a customer'}` })));
    return sendBooking(res, await populated(Booking.findById(booking._id)), 'Booking request submitted successfully');
  } catch (error) { next(error); }
};

exports.myBookings = async (req, res, next) => { try { const bookings = await populated(Booking.find({ customer: req.user.userId }).sort({ createdAt: -1 })); res.json({ success: true, data: { bookings } }); } catch (error) { next(error); } };
exports.getBooking = async (req, res, next) => { try { const booking = await populated(Booking.findById(req.params.id)); if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' }); if (req.user.role !== 'admin' && booking.customer._id.toString() !== req.user.userId) return res.status(403).json({ success: false, message: 'You cannot access this booking' }); sendBooking(res, booking); } catch (error) { next(error); } };
exports.adminBookings = async (req, res, next) => { try { const filter = req.query.status ? { status: req.query.status } : {}; const bookings = await populated(Booking.find(filter).sort({ createdAt: -1 })); res.json({ success: true, data: { bookings } }); } catch (error) { next(error); } };
exports.adminBooking = async (req, res, next) => { try { const booking = await populated(Booking.findById(req.params.id)); if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' }); sendBooking(res, booking); } catch (error) { next(error); } };

exports.transition = (from, to, timestamps = {}) => async (req, res, next) => { try { const booking = await Booking.findOneAndUpdate({ _id: req.params.id, status: from }, { $set: { status: to, ...timestamps(new Date(), req) } }, { new: true }); if (!booking) return res.status(400).json({ success: false, message: `Only ${from} bookings can be ${to === 'in_progress' ? 'started' : to}` }); sendBooking(res, await populated(Booking.findById(booking._id))); } catch (error) { next(error); } };
exports.confirm = async (req, res, next) => {
  try {
    const now = new Date();
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, status: 'pending' },
      { $set: { status: 'confirmed', confirmedAt: now, serviceDeadline: new Date(now.getTime() + 48 * 60 * 60 * 1000) } },
      { new: true }
    );
    if (!booking) return res.status(400).json({ success: false, message: 'Only pending bookings can be confirmed' });
    const service = await Service.findById(booking.service).select('name');
    await Notification.create({ recipient: booking.customer, booking: booking._id, type: 'booking_confirmed', title: 'Booking Confirmed', message: `Your ${service?.name || 'service'} booking is confirmed. Our team will visit within 48 hours.` });
    return sendBooking(res, await populated(Booking.findById(booking._id)));
  } catch (error) { next(error); }
};
exports.start = exports.transition('confirmed', 'in_progress', (now) => ({ startedAt: now }));
exports.complete = exports.transition('in_progress', 'completed', (now) => ({ completedAt: now }));
exports.cancel = async (req, res, next) => { try { const reason = req.body.reason?.trim(); if (!reason) return res.status(400).json({ success: false, message: 'Cancellation reason is required' }); const booking = await Booking.findOneAndUpdate({ _id: req.params.id, status: { $in: ['pending', 'confirmed'] } }, { $set: { status: 'cancelled', cancelledAt: new Date(), cancellationReason: reason } }, { new: true }); if (!booking) return res.status(400).json({ success: false, message: 'Only pending or confirmed bookings can be cancelled' }); sendBooking(res, await populated(Booking.findById(booking._id))); } catch (error) { next(error); } };
