const express = require('express');
const router = express.Router();
const { authenticateUser, checkRole } = require('../middleware/authMiddleware');

router.get('/public', (req, res) => {
  res.json({ message: 'Public content' });
});

router.get('/protected', authenticateUser, (req, res) => {
  res.json({ message: 'Protected content' });
});

router.get('/moderator', authenticateUser, checkRole(['moderator', 'admin']), (req, res) => {
  res.json({ message: 'Moderator content' });
});

router.get('/admin', authenticateUser, checkRole(['admin']), (req, res) => {
  res.json({ message: 'Admin content' });
});

module.exports = router;