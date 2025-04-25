const express = require('express');
const router = express.Router();
const authController = require('../controllers/authenticationController');
const { loginLimiter, registerLimiter } = require('../middleware/rateLimitingMiddleware');
router.post('/register', registerLimiter, authController.register);
router.post('/login', loginLimiter, authController.login);

module.exports = router;