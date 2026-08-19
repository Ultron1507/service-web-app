const Service = require('../models/Service');

const fields = '_id name slug description isActive';

exports.listServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).select(fields).sort({ name: 1 });
    res.json({ success: true, data: { services } });
  } catch (error) { next(error); }
};

exports.getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug }).select(fields);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    if (!service.isActive) return res.status(404).json({ success: false, message: 'This service is no longer available' });
    res.json({ success: true, data: service });
  } catch (error) { next(error); }
};
