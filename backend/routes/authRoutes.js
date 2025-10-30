const express = require('express');
const { registerUser, loginUser, getUserInfo } = require('../controllers/authController.js');

const {protect} = require('../middleware/authMiddleware.js');
const { upload } = require('../middleware/uploadMiddleware.js');

const router = express.Router();

// ✅ Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', protect, getUserInfo);

// ✅ Image upload route
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});


module.exports = router;
