// Run with: npm run seed
// Populates the database with demo users, visitors and appointments.
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Visitor = require('../models/Visitor');
const Appointment = require('../models/Appointment');

const seed = async () => {
  await connectDB();

  console.log('Clearing existing data...');
  await User.deleteMany();
  await Visitor.deleteMany();
  await Appointment.deleteMany();

  console.log('Creating users...');
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@vpms.com',
    password: 'Admin@123',
    role: 'admin',
    organization: 'VPMS Corp',
    phone: '9999900000',
  });

  const security = await User.create({
    name: 'Security Guard',
    email: 'security@vpms.com',
    password: 'Security@123',
    role: 'security',
    organization: 'VPMS Corp',
    phone: '9999900001',
  });

  const employee = await User.create({
    name: 'Employee Host',
    email: 'employee@vpms.com',
    password: 'Employee@123',
    role: 'employee',
    organization: 'VPMS Corp',
    phone: '9999900002',
  });

  console.log('Creating sample visitors...');
  const visitor1 = await Visitor.create({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '9876543210',
    company: 'Acme Pvt Ltd',
    address: 'Dehradun, Uttarakhand',
    createdBy: security._id,
  });

  const visitor2 = await Visitor.create({
    name: 'Priya Verma',
    email: 'priya.verma@example.com',
    phone: '9876543211',
    company: 'Globex Inc',
    address: 'New Delhi',
    createdBy: security._id,
  });

  console.log('Creating sample appointments...');
  await Appointment.create({
    visitorId: visitor1._id,
    hostId: employee._id,
    purpose: 'Business meeting',
    visitDate: new Date(),
    status: 'Pending',
  });

  await Appointment.create({
    visitorId: visitor2._id,
    hostId: employee._id,
    purpose: 'Interview',
    visitDate: new Date(Date.now() + 86400000),
    status: 'Pending',
  });

  console.log('Seed complete. Login credentials:');
  console.log('  Admin    -> admin@vpms.com / Admin@123');
  console.log('  Security -> security@vpms.com / Security@123');
  console.log('  Employee -> employee@vpms.com / Employee@123');

  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
