const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User');
const Notification = require('../models/Notification');
const mongoose = require('mongoose');

const populated = (query) => query.populate('customer', 'name phone email').populate('service', 'name description isActive');
const sendBooking = (res, booking, message = 'Booking updated successfully') => res.json({ success: true, message, data: { booking } });
const validStatuses = new Set(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']);
const normalizeStatus = (value) => {
  const status = String(value || 'pending').trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (status === 'accepted') return 'confirmed';
  if (status === 'inprogress') return 'in_progress';
  return validStatuses.has(status) ? status : 'pending';
};
const idValue = (value) => value?._id?.toString?.() || value?.toString?.() || '';
const serializeBookings = async (records) => {
  const customerIds = [...new Set(records.map((booking) => idValue(booking.customer || booking.userId)).filter(mongoose.isValidObjectId))];
  const serviceIds = [...new Set(records.map((booking) => idValue(booking.service)).filter(mongoose.isValidObjectId))];
  const [customers, services] = await Promise.all([User.find({ _id: { $in: customerIds } }).select('name phone email').lean(), Service.find({ _id: { $in: serviceIds } }).select('name description isActive').lean()]);
  const customersById = new Map(customers.map((customer) => [customer._id.toString(), customer]));
  const servicesById = new Map(services.map((service) => [service._id.toString(), service]));
  return records.map((booking) => {
    const serviceId = idValue(booking.service);
    const legacyServiceName = typeof booking.service === 'string' ? booking.service : booking.serviceName || booking.service?.name;
    const storedCustomer = customersById.get(idValue(booking.customer || booking.userId));
    const legacyCustomerName = booking.customerName || booking.name || booking.userName || booking.customer?.name;
    const legacyPhone = booking.phone || booking.customerPhone || booking.customer?.phone;
    const customer = storedCustomer || legacyCustomerName || legacyPhone ? { ...(storedCustomer || {}), name: storedCustomer?.name || legacyCustomerName || null, phone: storedCustomer?.phone || legacyPhone || '' } : null;
    return { ...booking, customer, service: servicesById.get(serviceId) || (legacyServiceName ? { name: legacyServiceName } : null), date: booking.date || booking.bookingDate || booking.createdAt, address: booking.address || booking.location || '', preferredTime: booking.preferredTime || booking.time || '', status: normalizeStatus(booking.status) };
  });
};
const rawBookings = async (filter = {}) => serializeBookings(await Booking.collection.find(filter).sort({ createdAt: -1, _id: -1 }).toArray());

exports.createBooking = async (req, res, next) => {
  try {
    const { serviceId, date, preferredTime, address, name } = req.body;
    if (!serviceId || !date || !preferredTime?.trim() || !address?.trim()) return res.status(400).json({ success: false, message: 'Service, date, preferred time, and address are required' });
    if (!mongoose.isValidObjectId(serviceId)) return res.status(400).json({ success: false, message: 'Invalid service ID' });
    const bookingDate = new Date(date);
    if (Number.isNaN(bookingDate.getTime()) || bookingDate < new Date(new Date().setHours(0, 0, 0, 0))) return res.status(400).json({ success: false, message: 'Please select a valid future date' });
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    if (!service.isActive) return res.status(400).json({ success: false, message: 'This service is currently unavailable' });
    const booking = await Booking.create({ customer: req.user.userId, service: service._id, date: bookingDate, preferredTime: preferredTime.trim(), address: address.trim() });
    const customerName = name?.trim();
    const [admins, customer] = await Promise.all([User.find({ role: 'admin', isActive: true }).select('_id'), customerName ? User.findByIdAndUpdate(req.user.userId, { $set: { name: customerName } }, { new: true }).select('name phone') : User.findById(req.user.userId).select('name phone')]);
    if (admins.length) await Notification.insertMany(admins.map((admin) => ({ recipient: admin._id, type: 'new_booking', booking: booking._id, title: 'New Booking', message: `${service.name} booking from ${customer?.name || customer?.phone || 'a customer'}` })));
    return sendBooking(res, await populated(Booking.findById(booking._id)), 'Booking request submitted successfully');
  } catch (error) { next(error); }
};

exports.myBookings = async (req, res, next) => { try { const customerId = new mongoose.Types.ObjectId(req.user.userId); const bookings = await rawBookings({ $or: [{ customer: customerId }, { userId: customerId }] }); res.json({ success: true, data: { bookings } }); } catch (error) { next(error); } };
exports.getBooking = async (req, res, next) => { try { if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, message: 'Booking not found' }); const [booking] = await rawBookings({ _id: new mongoose.Types.ObjectId(req.params.id) }); if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' }); const ownerId = idValue(booking.customer || booking.userId); if (req.user.role !== 'admin' && ownerId !== req.user.userId) return res.status(403).json({ success: false, message: 'You cannot access this booking' }); sendBooking(res, booking); } catch (error) { next(error); } };
exports.adminBookings = async (req, res, next) => { try { let bookings = await rawBookings(); if (req.query.status) bookings = bookings.filter((booking) => booking.status === normalizeStatus(req.query.status)); res.json({ success: true, data: { bookings } }); } catch (error) { next(error); } };
exports.adminBooking = async (req, res, next) => { try { if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, message: 'Booking not found' }); const [booking] = await rawBookings({ _id: new mongoose.Types.ObjectId(req.params.id) }); if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' }); sendBooking(res, booking); } catch (error) { next(error); } };

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedTransitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['in_progress', 'completed', 'cancelled'],
      in_progress: ['completed'],
    };
    if (!['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].includes(status)) return res.status(400).json({ success: false, message: 'Invalid booking status' });
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, message: 'Booking not found' });
    const bookingId = new mongoose.Types.ObjectId(req.params.id);
    const current = await Booking.collection.findOne({ _id: bookingId });
    if (!current) return res.status(404).json({ success: false, message: 'Booking not found' });
    const currentStatus = normalizeStatus(current.status);
    if (!allowedTransitions[currentStatus]?.includes(status)) return res.status(400).json({ success: false, message: `This ${currentStatus} booking cannot be changed to ${status}` });

    const now = new Date();
    const updates = { status };
    if (status === 'confirmed') { updates.confirmedAt = now; updates.serviceDeadline = new Date(now.getTime() + 48 * 60 * 60 * 1000); }
    if (status === 'in_progress') updates.startedAt = now;
    if (status === 'completed') updates.completedAt = now;
    if (status === 'cancelled') updates.cancelledAt = now;
    const currentStatusFilter = Object.prototype.hasOwnProperty.call(current, 'status') ? current.status : { $exists: false };
    const updateResult = await Booking.collection.updateOne({ _id: bookingId, status: currentStatusFilter }, { $set: updates });
    if (!updateResult.modifiedCount) return res.status(409).json({ success: false, message: 'This booking was updated by another request. Please refresh and try again.' });
    const booking = await Booking.collection.findOne({ _id: bookingId });
    if (status === 'confirmed') {
      const service = mongoose.isValidObjectId(booking.service) ? await Service.findById(booking.service).select('name') : null;
      const recipient = booking.customer || booking.userId;
      const serviceName = service?.name || (typeof booking.service === 'string' ? booking.service : booking.serviceName) || 'your service';
      const bookingDate = booking.date || booking.bookingDate || booking.createdAt;
      if (mongoose.isValidObjectId(recipient)) await Notification.create({ recipient, booking: booking._id, type: 'booking_confirmed', title: '🎉 Your booking is confirmed!', message: `Your booking for ${serviceName} on ${bookingDate ? new Date(bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'your requested date'} has been confirmed.` });
    }
    return sendBooking(res, (await serializeBookings([booking]))[0], 'Booking status updated successfully');
  } catch (error) { next(error); }
};

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
