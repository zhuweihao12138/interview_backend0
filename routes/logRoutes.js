const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/logController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/', authenticateToken, getLogs);

module.exports = router;
