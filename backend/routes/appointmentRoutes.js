const express = require('express');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user's appointments
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id })
      .populate('doctorId', 'name')
      .sort({ appointmentDateTime: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});



// Get all appointments for user
router.get('/all', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id })
      .populate('doctorId', 'name')
      .sort({ appointmentDateTime: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Create new appointment
router.post('/', auth, async (req, res) => {
  console.log(req.body);
  try {
    const {userId, doctorId, dateTime, status = 'Pending'} = req.body;

    // Check if the requested time is in the future
    const appointmentDateTime = new Date(dateTime);
    if (appointmentDateTime <= new Date()) {
      return res.status(400).json({
        error: 'Invalid appointment time',
        message: 'Appointment time must be in the future'
      });
    }

    // Check for conflicting appointments (same doctor at same time)
    const conflictingAppointment = await Appointment.findOne({
      doctorId: doctorId,
      appointmentDateTime: appointmentDateTime,
      status: { $in: ['Pending', 'Confirmed'] }
    });

    if (conflictingAppointment) {
      return res.status(409).json({
        error: 'Time slot unavailable',
        message: 'This time slot is already booked'
      });
    }

    // Get doctor details
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        error: 'Doctor not found',
        message: 'No doctor found with the provided ID'
      });
    }

    // Create new appointment
    const appointment = new Appointment({
      userId: userId,
      doctorId: doctorId,
      appointmentDateTime: appointmentDateTime,
      status: status,
    });

    await appointment.save();

    res.status(200).json({
      text: "Appointment Booked Successfully"
    });

  } catch (error) {
    console.error('Error creating appointment:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        message: Object.values(error.errors).map(err => err.message).join(', ')
      });
    }
    
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to book appointment'
    });
  }
});

// Delete appointment
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (appointment.appointmentDateTime <= new Date()) {
      return res.status(400).json({ error: 'Cannot delete past appointment' });
    }

    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

module.exports = router; 