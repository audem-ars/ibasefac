// backend/src/routes/authroutes.js
const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../controllers/authcontroller');
const auth = require('../middleware/authmiddleware');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Verify token route (protected route)
router.get('/verify', auth, verifyToken);

module.exports = router;