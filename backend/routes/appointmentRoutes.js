const express = require('express');
const {
  createAppointment,
  getAppointments,
  approveAppointment,
  rejectAppointment,
} = require('../controllers/appointmentController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/role');

const router = express.Router();

router.post('/', protect, authorize('admin', 'security', 'employee'), createAppointment);
router.get('/', protect, getAppointments);
router.patch('/:id/approve', protect, authorize('admin', 'employee'), approveAppointment);
router.patch('/:id/reject', protect, authorize('admin', 'employee'), rejectAppointment);

module.exports = router;
