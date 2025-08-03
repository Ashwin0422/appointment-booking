# Healthcare Appointment Booking API

A simple REST API for healthcare appointment booking built with Node.js, Express.js, and MongoDB.


## Features

- User authentication with JWT
- Doctor management and profiles
- Appointment booking system
- Input validation and error handling


## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/healthcare_appointments
   JWT_SECRET=your_secret_key
   ```

3. **Start the server**
   ```bash
   npm run dev
   ```


## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login

### Doctors
- `GET /api/doctors/` - Get all doctors
- `GET /api/doctors/:id` - Get single doctor

### Appointments
- `GET /api/userappointments/` - Get user's appointments
- `POST /api/userappointments/` - Book appointment
- `DELETE /api/userappointments/:id` - Cancel appointment 


## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
