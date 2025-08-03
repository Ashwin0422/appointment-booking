const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();
const auth = require('../middleware/auth');

// Get all doctors
router.get('/', auth, async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// Get single doctor by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .select('name specialization image availability about');

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ error: 'Failed to fetch doctor details' });
  }
});

module.exports = router; 