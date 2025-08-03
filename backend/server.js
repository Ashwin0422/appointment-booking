const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config({ path: './config.env' });

// Import routes
const doctorRoutes = require('./routes/doctorRoutes');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// Database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("Connected to MongoDB");
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); 
});

// Routes
app.use('/api/doctors', doctorRoutes);
app.use('/api', authRoutes);
app.use('/api/userappointments', appointmentRoutes);


// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `The route you are looking for does not exist` 
  });
});

// Cache control
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});