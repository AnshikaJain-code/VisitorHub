const Visitor = require('../models/Visitor');
const Pass = require('../models/Pass');
const CheckLog = require('../models/CheckLog');

// GET /api/dashboard/stats
const getStats = async (req, res, next) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const totalVisitors = await Visitor.countDocuments();
    const todaysVisitors = await Visitor.countDocuments({ createdAt: { $gte: startOfToday } });
    const activePasses = await Pass.countDocuments({ status: 'Active' });
    const checkInsToday = await CheckLog.countDocuments({ checkInTime: { $gte: startOfToday } });

    res.json({ totalVisitors, todaysVisitors, activePasses, checkInsToday });
  } catch (err) {
    next(err);
  }
};

module.exports = { getStats };
