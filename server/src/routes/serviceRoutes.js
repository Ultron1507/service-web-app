const router = require('express').Router();
const { listServices, getServiceBySlug } = require('../controllers/serviceController');
router.get('/', listServices);
router.get('/slug/:slug', getServiceBySlug);
module.exports = router;
