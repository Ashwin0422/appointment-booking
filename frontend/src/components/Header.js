import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = Cookies.get('jwtToken');
    return !!token;
  };

  const handleLogout = () => {
    // Remove JWT token from cookies
    Cookies.remove('jwtToken');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              MedBook
            </Link>
          </div>

          {/* Centered Navigation Links */}
          {isAuthenticated() && (
            <div className="hidden md:flex items-center space-x-4 absolute left-1/2 transform -translate-x-1/2">
              <Link 
                to="/" 
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-50 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Home
                {isActive('/') && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                )}
              </Link>
              <Link 
                to="/appointments" 
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive('/appointments') 
                    ? 'text-blue-600 bg-blue-50 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Appointments
                {isActive('/appointments') && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                )}
              </Link>
            </div>
          )}

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated() ? (
              <button
                onClick={handleLogout}
                className="group relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-red-600 hover:to-red-700 active:scale-95"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="group relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-purple-700 active:scale-95"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Login</span>
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated() && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Link 
                to="/" 
                className={`flex-1 text-center py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-50 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/appointments" 
                className={`flex-1 text-center py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  isActive('/appointments') 
                    ? 'text-blue-600 bg-blue-50 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Appointments
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 