import React, { useState, useEffect } from 'react';
import AppointmentCard from '../components/AppointmentCard';
import Cookies from 'js-cookie';
import Header from '../components/Header';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
        console.log(`Jwt Token : ${Cookies.get('jwtToken')}`);
      const response = await fetch('https://appointment-booking-susk.onrender.com/api/userappointments/', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('jwtToken')}`
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setAppointments(data);
      } else {
        setError('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`https://appointment-booking-susk.onrender.com/api/userappointments/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Cookies.get('jwtToken')}`
        }
      });

      if (response.status === 200) {
        setAppointments(appointments.filter(app => app._id !== appointmentId));
        alert('Appointment cancelled successfully');
      } else {
        setError('Failed to cancel appointment');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setError('Network error. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="h-screen pt-20 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your appointments...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="pt-20 px-6 py-8 max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Appointments</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="pt-20 px-6 py-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            My Appointments
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your scheduled appointments and stay on top of your healthcare
          </p>
        </div>

        {/* Stats Section */}
        {appointments.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{appointments.length}</div>
                <div className="text-gray-600">Total Appointments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {appointments.filter(app => app.status === 'Confirmed').length}
                </div>
                <div className="text-gray-600">Confirmed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {appointments.filter(app => app.status === 'Pending').length}
                </div>
                <div className="text-gray-600">Pending</div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments List */}
        {appointments.length > 0 ? (
          <div className="space-y-6">
            {appointments.map((appointment, index) => (
              <div
                key={appointment._id}
                className="transform hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AppointmentCard
                  appointment={appointment}
                  onCancel={handleCancelAppointment}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-12 shadow-xl border border-white/50 max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Appointments Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't booked any appointments yet. Start by finding a doctor and booking your first appointment.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Find Doctors
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Appointments; 