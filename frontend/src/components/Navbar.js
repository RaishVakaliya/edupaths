import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import config from '../config/config';

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const [searchQuery, setSearchQuery] = useState('');

  const getProfilePicUrl = (profilePicture) => {
    if (!profilePicture) return null;
    if (profilePicture.startsWith('http')) return profilePicture;
    return `${config.API_URL}${profilePicture}`;
  };

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-emerald-600">
              EduPath
            </Link>
          </div>

          {/* Search Bar */}
          {auth?.isAuthenticated && (
            <div className="flex-1 max-w-lg mx-4">
              <form onSubmit={(e) => {
                e.preventDefault();
                onSearch(searchQuery);
              }} className="relative">
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </form>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {auth?.isAuthenticated && user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center text-gray-700 hover:text-emerald-600"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={getProfilePicUrl(user.profilePicture) || 'https://via.placeholder.com/32'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{user.name}</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-emerald-600"
                >
                  <FiLogOut className="mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 