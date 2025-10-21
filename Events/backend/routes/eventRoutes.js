const express = require('express');
const router = express.Router();
const multer = require('multer');
const dotenv = require('dotenv');
const {
  createEvent,
  getAllEvents,
  getEventById,
} = require('../controllers/eventController');

dotenv.config();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split('.').pop();
    cb(null, `banner-${uniqueSuffix}.${ext}`);
  },
});

const upload = multer({ storage });

/**
 * ✅ Admin-protected route
 * Validates `adminPassword` before calling createEvent
 */
router.post('/', upload.single('banner'), (req, res, next) => {
  const { adminPassword } = req.body;

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid admin password',
    });
  }

  // Password is valid, proceed to controller
  createEvent(req, res, next);
});

router.get('/all-events', getAllEvents);
router.get('/all-events/:id', getEventById);

module.exports = router;
