// backend/routes/prediction.js

const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');

// Middleware to protect VIP route
const authenticateUser = require('../middleware/authMiddleware');

// Public prediction route (e.g., for free predictions)
router.get('/free', predictionController.getFreePredictions);

// VIP prediction route (requires VIP user)
router.get('/vip', authenticateUser, predictionController.getVIPPredictions);

module.exports = router;
