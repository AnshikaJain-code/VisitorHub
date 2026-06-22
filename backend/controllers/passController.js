const Pass = require('../models/Pass');
const CheckLog = require('../models/CheckLog');

// GET /api/pass/:id
const getPassById = async (req, res, next) => {
  try {
    const pass = await Pass.findById(req.params.id)
      .populate('visitorId')
      .populate('appointmentId');
    if (!pass) return res.status(404).json({ message: 'Pass not found' });
    if (pass.status === "Active" && new Date() > new Date(pass.validTill)) {
      pass.status = "Expired";
      await pass.save();
    }
    res.json(pass);
  } catch (err) {
    next(err);
  }
};

// POST /api/pass/verify  { passNumber }
// Used by the QR scanner page. Returns visitor + appointment + pass status.
const verifyPass = async (req, res, next) => {
  try {
    const { passNumber } = req.body;
    const pass = await Pass.findOne({ passNumber })
      .populate('visitorId')
      .populate('appointmentId');

    if (!pass) return res.status(404).json({ message: 'Invalid pass - not found' });

    if (pass.status === 'Revoked' || pass.status === 'Expired') {
      return res.status(400).json({ message: `Pass is ${pass.status}`, pass });
    }

    if (new Date() > new Date(pass.validTill)) {
      pass.status = 'Expired';
      await pass.save();
      return res.status(400).json({ message: 'Pass has expired', pass });
    }

    res.json({ message: 'Pass is valid', pass });
  } catch (err) {
    next(err);
  }
};

// GET /api/pass/appointment/:appointmentId
const getPassByAppointment = async (req, res, next) => {
  try {
    const pass = await Pass.findOne({
      appointmentId: req.params.appointmentId,
    });

    if (!pass) {
      return res.status(404).json({
        message: "Pass not found",
      });
    }

    res.json(pass);
  } catch (err) {
    next(err);
  }
};

module.exports = { getPassById, verifyPass, getPassByAppointment };
