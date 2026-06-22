const Appointment = require('../models/Appointment');
const Visitor = require('../models/Visitor');
const Pass = require('../models/Pass');
const generatePassNumber = require('../utils/generatePassNumber');
const { generateQRCode } = require('../services/qrService');
const { generatePassPDF } = require('../services/pdfService');
const {
  sendAppointmentApprovedEmail,
  sendAppointmentRejectedEmail,
  sendPassIssuedEmail,
} = require('../services/emailService');
const User = require('../models/User');

// POST /api/appointments
const createAppointment = async (req, res, next) => {
  try {
    const { visitorId, hostId, purpose, visitDate } = req.body;

    const selectedDate = new Date(visitDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({
        message: "Visit date cannot be in the past",
      });
    }

    const appointment = await Appointment.create({ visitorId, hostId, purpose, visitDate, status: 'Pending' });

    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};

// GET /api/appointments
const getAppointments = async (req, res, next) => {
  try {
    const { status, hostId } = req.query;
    const query = {};
    if (status) query.status = status;
    if (hostId) query.hostId = hostId;

    const appointments = await Appointment.find(query)
      .populate('visitorId', 'name email phone company')
      .populate('hostId', 'name email')
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/appointments/:id/approve
// Approves the appointment AND generates the QR pass + PDF in one flow
const approveAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('visitorId');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    // GPT lines (6)
    const existingPass = await Pass.findOne({ appointmentId: appointment._id, }); 
    if (existingPass) { 
      return res.status(400).json({ 
        message: "Pass already generated for this appointment", 
      }); 
    }

    appointment.status = 'Approved';
    appointment.approvedBy = req.user._id;
    await appointment.save();

    const passNumber = generatePassNumber();
    const qrCode = await generateQRCode(passNumber);

    const validTill = new Date(appointment.visitDate);
    validTill.setHours(23, 59, 59);

    let pass = await Pass.create({
      visitorId: appointment.visitorId._id,
      appointmentId: appointment._id,
      qrCode,
      passNumber,
      validTill,
    });

    const host = await User.findById(appointment.hostId);
    const pdfUrl = await generatePassPDF({
      visitor: appointment.visitorId,
      appointment,
      pass,
      host,
    });

    pass.pdfUrl = pdfUrl;
    await pass.save();

    if (appointment.visitorId.email) {
      await sendAppointmentApprovedEmail(
        appointment.visitorId.email,
        appointment.visitorId.name,
        appointment.visitDate
      );
      await sendPassIssuedEmail(
        appointment.visitorId.email,
        appointment.visitorId.name,
        passNumber,
        pdfUrl,
        process.env.BASE_URL
      );
    }

    res.json({ appointment, pass });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/appointments/:id/reject
const rejectAppointment = async (req, res, next) => {
  try {
    const { remarks } = req.body;
    const appointment = await Appointment.findById(req.params.id).populate('visitorId');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = 'Rejected';
    appointment.remarks = remarks;
    appointment.approvedBy = req.user._id;
    await appointment.save();

    if (appointment.visitorId.email) {
      await sendAppointmentRejectedEmail(appointment.visitorId.email, appointment.visitorId.name, remarks);
    }

    res.json(appointment);
  } catch (err) {
    next(err);
  }
};

module.exports = { createAppointment, getAppointments, approveAppointment, rejectAppointment };
