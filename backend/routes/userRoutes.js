const express = require('express');

const router = express.Router();

const {
  getUsers,
  createUser
} = require('../controllers/userController');

const {
  protect,
  adminOnly
} = require('../middlewares/auth');

router.get('/', protect, adminOnly, getUsers);

router.post('/', protect, adminOnly, createUser);

module.exports = router;