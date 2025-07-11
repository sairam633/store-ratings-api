const express = require('express');
const router = express.Router();
const { addStore, getAllStores } = require('../controllers/storeController');
// const authenticateToken = require('../middleware/authMiddleware');

// POST route to add a store (secured)
router.post('/', /*authenticateToken,*/ addStore);

// GET route to fetch all stores (no auth for now)
router.get('/', getAllStores);

module.exports = router;
