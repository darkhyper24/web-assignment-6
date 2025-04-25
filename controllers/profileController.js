const bcrypt = require('bcryptjs');
const { users } = require('../models');
const { Op } = require('sequelize');

exports.getProfile = async (req, res) => {
  try {
    const userProfile = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role
    };
    
    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { email, password } = req.body;
    const updates = {};
    
    if (email) {
      const existingUser = await users.findOne({ 
        where: { 
          email,
          id: { [Op.ne]: req.user.id }
        } 
      });
      
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      
      updates.email = email;
    }
    
    if (password) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
          message: 'Password must be at least 8 characters long and contain at least one number and one special character' 
        });
      }
      
      updates.password = await bcrypt.hash(password, 10);
    }
    
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No valid updates provided' });
    }
    
    await users.update(updates, { where: { id: req.user.id } });
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    const validRoles = ['user', 'moderator', 'admin'];
    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await users.update({ role }, { where: { id } });
    
    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};