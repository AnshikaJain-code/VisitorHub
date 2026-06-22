const express = require('express');
const { checkIn, checkOut, getLogs } = require('../controllers/checkLogController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/role');

const router = express.Router();

router.post('/checkin', protect, authorize('admin', 'security'), checkIn);
router.post('/checkout', protect, authorize('admin', 'security'), checkOut);
router.get('/', protect, getLogs);

module.exports = router;
