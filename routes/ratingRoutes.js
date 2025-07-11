const express = require('express');
const router = express.Router();
const {
  submitRating,
  getRatingsByUser,
  getRatingsForStore,
  deleteRating
} = require('../controllers/ratingController');
const authenticateToken = require('../middleware/authMiddleware');

// Add rating
router.post('/', authenticateToken, submitRating);

// Get ratings by user
router.get('/user', authenticateToken, getRatingsByUser);

// Get ratings for a store
router.get('/:storeId', getRatingsForStore);

// Delete a rating
router.delete('/:storeId', authenticateToken, deleteRating);

module.exports = router;
