import React, { useState, useEffect } from 'react';
import DoctorCard from '../components/DoctorCard';
import { Oval } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import Header from '../components/Header';

const mockDoctors = [
  {
    _id: '1',
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    availability: 'Mon-Fri 9AM-5PM'
  },
  {
    _id: '2',
    name: 'Dr. Sarah Johnson',
    specialization: 'Dermatology',
    availability: 'Tue-Sat 10AM-6PM'
  },
  {
    _id: '3',
    name: 'Dr. Michael Brown',
    specialization: 'Neurology',
    availability: 'Mon-Thu 8AM-4PM'
  }
]

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('https://appointment-booking-susk.onrender.com/api/doctors/', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('jwtToken')}`
        }
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setDoctors(Array.isArray(data.data) ? data.data : []);
      } else {
        // Use mock data if API fails
        setDoctors(mockDoctors);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="h-screen pt-20 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Finding the best doctors for you...</p>
          </div>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="pt-20 px-6 py-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in">
            Find Your Perfect Doctor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Book appointments with the best doctors in your area. Get the care you deserve with our trusted healthcare professionals.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50 mb-12 transform hover:scale-[1.02] transition-all duration-300">
          <div className="max-w-2xl mx-auto">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search Doctors</span>
              </div>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              Found <span className="font-semibold text-blue-600">{filteredDoctors.length}</span> doctor{filteredDoctors.length !== 1 ? 's' : ''} matching "{searchTerm}"
            </p>
          </div>
        )}

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <div
                key={doctor._id}
                className="transform hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DoctorCard doctor={doctor} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-12 shadow-xl border border-white/50">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctors found</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `No doctors found matching "${searchTerm}". Try a different search term.`
                    : 'No doctors available at the moment. Please check back later.'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
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

export default Home; 