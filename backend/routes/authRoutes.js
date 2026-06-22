const express = require('express');
const { body } = require('express-validator');
const { register, login, refresh, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/register',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  register
);
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], login);
router.post('/refresh', refresh);
router.get('/me', protect, getMe);

module.exports = router;
