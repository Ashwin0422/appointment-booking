const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor ID is required']
  },
  appointmentDateTime: {
    type: Date,
    required: [true, 'Appointment date and time is required']
  },
  status: {
    type: String,
    enum: {
      values: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      message: 'Status must be one of: Pending, Confirmed, Cancelled, Completed'
    },
    default: 'Pending'
  },
}, {
  timestamps: true
});

// Index for efficient queries
appointmentSchema.index({ userId: 1, appointmentDateTime: 1 });
appointmentSchema.index({ doctorId: 1, appointmentDateTime: 1 });
appointmentSchema.index({ status: 1 });


module.exports = mongoose.model('Appointment', appointmentSchema, 'Appointments'); 