const rateLimit = require('express-rate-limit');

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: {
    message: 'Too many login attempts, please try again after 15 minutes'
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

exports.registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 4, 
  message: {
    message: 'Too many registration attempts, please try again after an hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
});