const express = require('express');
const { getPassById, verifyPass, getPassByAppointment } = require('../controllers/passController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/appointment/:appointmentId', protect, getPassByAppointment);
router.get('/:id', protect, getPassById);
router.post('/verify', protect, verifyPass);

module.exports = router;
