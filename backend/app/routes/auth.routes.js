// auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /login route
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/register', authController.registerUser);
module.exports = router;
