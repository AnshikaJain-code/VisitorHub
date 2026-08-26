const User = require('../models/User');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('_id name email role');

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role, organization, phone } = req.body;

    // Only employee and security accounts can be created here
    if (!['employee', 'security'].includes(role)) {
      return res.status(400).json({
        message: 'Only employee or security accounts can be created'
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: 'User with this email already exists'
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      organization,
      phone
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, createUser };