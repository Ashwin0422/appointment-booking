import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="group relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-2 overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start space-x-5">
          {/* Doctor Avatar */}
          <div className="relative flex-shrink-0">
            {doctor.image && !imageError ? (
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 ring-4 ring-white/50">
                <img
                  src={doctor.image}
                  alt={`Dr. ${doctor.name}`}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 ring-4 ring-white/50">
                <span className="text-3xl text-white font-bold">
                  {doctor.name?.charAt(0) || 'D'}
                </span>
              </div>
            )}
            
            {/* Online Status Indicator */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Doctor Information */}
          <div className="flex-1 min-w-0">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-1">
                {doctor.name}
              </h3>
              <div className="flex items-center space-x-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {doctor.specialization}
                </span>
              </div>
            </div>

            {/* Availability and Details */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Available</span>
                <span className="text-gray-400">•</span>
                <span>{doctor.availability}</span>
              </div>
              
              {doctor.about && (
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {doctor.about.length > 80 ? `${doctor.about.substring(0, 80)}...` : doctor.about}
                </p>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0">
            <Link
              to={`/doctor/${doctor._id}`}
              className="group/btn relative inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <svg className="w-5 h-5 transition-transform group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-6 pt-4 border-t border-gray-200/50">
          <Link
            to={`/doctor/${doctor._id}`}
            className="group/btn relative w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <svg className="w-4 h-4 transition-transform group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Book Appointment</span>
            </span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full translate-y-12 -translate-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
    </div>
  );
};

export default DoctorCard; 