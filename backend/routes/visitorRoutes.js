const express = require('express');
const {
  createVisitor,
  getVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
} = require('../controllers/visitorController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/role');
const upload = require('../middlewares/upload');

const router = express.Router();

const uploadFields = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'idProof', maxCount: 1 }]);

router.post('/', protect, authorize('admin', 'security', 'employee'), uploadFields, createVisitor);
router.get('/', protect, getVisitors);
router.get('/:id', protect, getVisitorById);
router.put('/:id', protect, authorize('admin', 'security', 'employee'), uploadFields, updateVisitor);
router.delete('/:id', protect, authorize('admin'), deleteVisitor);

module.exports = router;
