const express = require('express');
const router = express.Router();
const { getAppointments, createAppointment, deleteAppointment } = require('../controllers/appointmentController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/', authenticateToken, getAppointments);
router.post('/', authenticateToken, createAppointment);
router.delete('/:id', authenticateToken, deleteAppointment);

module.exports = router;
