const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../models');

exports.register = async (req, res) => {
  try {
    const { role , username, email, password } = req.body;

    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long and contain at least one number and one special character' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await users.create({
      role,
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User created successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { uid: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};