const Visitor = require('../models/Visitor');

// POST /api/visitors
const createVisitor = async (req, res, next) => {
  try {
    const { name, email, phone, address, company } = req.body;
    const photo = req.files?.photo?.[0]?.path.replace(/.*uploads/, '/uploads');
    const idProof = req.files?.idProof?.[0]?.path.replace(/.*uploads/, '/uploads');

    const visitor = await Visitor.create({
      name,
      email,
      phone,
      address,
      company,
      photo,
      idProof,
      createdBy: req.user._id,
    });

    res.status(201).json(visitor);
  } catch (err) {
    next(err);
  }
};

// GET /api/visitors
const getVisitors = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const query = search ? { $text: { $search: search } } : {};

    const visitors = await Visitor.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Visitor.countDocuments(query);

    res.json({ visitors, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

// GET /api/visitors/:id
const getVisitorById = async (req, res, next) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    res.json(visitor);
  } catch (err) {
    next(err);
  }
};

// PUT /api/visitors/:id
const updateVisitor = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.files?.photo?.[0]) updates.photo = req.files.photo[0].path.replace(/.*uploads/, '/uploads');
    if (req.files?.idProof?.[0]) updates.idProof = req.files.idProof[0].path.replace(/.*uploads/, '/uploads');

    const visitor = await Visitor.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    res.json(visitor);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/visitors/:id
const deleteVisitor = async (req, res, next) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    res.json({ message: 'Visitor deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createVisitor, getVisitors, getVisitorById, updateVisitor, deleteVisitor };
