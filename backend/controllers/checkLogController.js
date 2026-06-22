  const Pass = require('../models/Pass');
  const CheckLog = require('../models/CheckLog');

  // POST /api/checklog/checkin  { passNumber }
  const checkIn = async (req, res, next) => {
    try {
      const { passNumber } = req.body;
      const pass = await Pass.findOne({ passNumber });
      if (!pass) return res.status(404).json({ message: 'Pass not found' });

      if (pass.status !== 'Active') {
        return res.status(400).json({ message: `Cannot check in - pass status is ${pass.status}` });
      }

      const log = await CheckLog.create({
        passId: pass._id,
        visitorId: pass.visitorId,
        checkInTime: new Date(),
        scannedBy: req.user._id,
      });

      res.status(201).json(log);
    } catch (err) {
      next(err);
    }
  };

  // POST /api/checklog/checkout  { passNumber }
  const checkOut = async (req, res, next) => {
    try {
      const { passNumber } = req.body;
      const pass = await Pass.findOne({ passNumber });
      if (!pass) return res.status(404).json({ message: 'Pass not found' });

      const log = await CheckLog.findOne({ passId: pass._id, checkOutTime: null }).sort({ createdAt: -1 });
      if (!log) return res.status(400).json({ message: 'No active check-in found for this pass' });

      log.checkOutTime = new Date();
      await log.save();

      pass.status = 'Used';
      await pass.save();

      res.json(log);
    } catch (err) {
      next(err);
    }
  };

  // GET /api/checklog
  const getLogs = async (req, res, next) => {
    try {
      const { date } = req.query;

      const query = {};

      if (date) {
    const start = new Date(`${date}T00:00:00+05:30`);
    const end = new Date(`${date}T23:59:59+05:30`);

    query.checkInTime = {
      $gte: start,
      $lte: end,
    };
  }

      const logs = await CheckLog.find(query)
        .populate("visitorId", "name phone company")
        .populate("passId", "passNumber")
        .populate("scannedBy", "name")
        .sort({ createdAt: -1 });

      res.json(logs);
    } catch (err) {
      next(err);
    }
  };



  module.exports = { checkIn, checkOut, getLogs };
