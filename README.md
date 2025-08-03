# MedBook - Appointment Booking System

A modern healthcare appointment booking application built with React and Node.js.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AppointmentBooking
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create config.env file in backend directory
   MONGODB_URI=mongodb://localhost:27017/medbook
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start Backend Server**
   ```bash
   npm start
   # Server runs on http://localhost:5000
   ```

5. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Start Frontend Development Server**
   ```bash
   npm start
   # App opens at http://localhost:3000
   ```

## 🌐 Deployment

### Frontend Hosting
The frontend application is hosted on **Vercel** and is available at:
```
https://appointment-booking-snowy-nu.vercel.app/
```

### Backend Hosting
The backend API is hosted on **Render** and is available at:
```
https://appointment-booking-susk.onrender.com
```

**API Base URL**: `https://appointment-booking-susk.onrender.com/api`

> **Note**: The application might be slow because we are using free backend deployment. For production use, consider upgrading to a paid plan for better performance.

## 🚧 Deployment Challenges

### Frontend Issues
- **404 Errors**: React Router routes not working on direct access
- **Solution**: Switched from Netlify to Vercel (better React support)

### Backend Issues  
- **Slow Performance**: Free tier limitations on Render
- **Solution**: Added loading states and performance optimizations

> **Note**: Application may be slow due to free backend deployment.


## ✨ Features

- **User Authentication** - Secure login/signup with JWT
- **Doctor Discovery** - Browse and search doctors
- **Appointment Booking** - Easy appointment scheduling
- **Appointment Management** - View and cancel appointments
- **Modern UI** - Beautiful, responsive design
- **Real-time Updates** - Live appointment status

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose ODM

## 📱 Pages

| Page | Description |
|------|-------------|
| **Home** | Browse doctors with search functionality |
| **Login/Signup** | User authentication |
| **Doctor Detail** | View doctor info and book appointments |
| **Appointments** | Manage your appointments |
| **404** | Error page handling |

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/register` | User registration |
| `POST` | `/api/login` | User login |
| `GET` | `/api/doctors` | Get all doctors |
| `GET` | `/api/doctors/:id` | Get single doctor |
| `POST` | `/api/userappointments` | Book appointment |
| `GET` | `/api/userappointments` | Get user appointments |
| `DELETE` | `/api/userappointments/:id` | Cancel appointment |


## 🎨 UI Features

- **Modern Design** - Glassmorphism effects and smooth animations
- **Responsive Layout** - Works on all devices
- **Interactive Elements** - Hover effects and transitions
- **Loading States** - Beautiful loading animations
- **Error Handling** - User-friendly error messages

## 🔐 Security

- JWT token authentication
- Protected routes
- Input validation
- Secure password handling
- CORS enabled

