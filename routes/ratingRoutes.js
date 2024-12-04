const express = require('express');
const router = express.Router();
const { getUserRatings, rateUser } = require('../controllers/ratingController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/', authenticateToken, getUserRatings);
router.post('/', authenticateToken, rateUser);

module.exports = router;
