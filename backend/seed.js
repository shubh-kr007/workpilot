const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
require('dotenv').config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});

    // Create admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@workpilot.com',
      password: adminPassword,
      role: 'Admin',
    });

    // Create member
    const memberPassword = await bcrypt.hash('member123', 10);
    const member = await User.create({
      name: 'John Member',
      email: 'member@workpilot.com',
      password: memberPassword,
      role: 'Member',
    });

    console.log('✅ Users created:');
    console.log('Admin:', admin.email);
    console.log('Member:', member.email);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedUsers();