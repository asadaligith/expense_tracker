const express = require('express');
const { registerUser, loginUser, getUserInfo } = require('../controllers/authController.js');


const router = express.Router();

// ✅ Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/user', protect, getUserInfo);


module.exports = router;