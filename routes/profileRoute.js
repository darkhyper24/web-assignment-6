const express = require('express');
const router = express.Router();
const { authenticateUser, checkRole } = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

router.get('/profile', authenticateUser, profileController.getProfile);
router.put('/profile', authenticateUser, profileController.updateProfile);
router.put('/users/:id/role', authenticateUser, checkRole(['admin']), profileController.updateUserRole);
module.exports = router;