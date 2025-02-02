import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaClipboardList, FaBuilding, FaUser } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <FaTimes size={24} className="text-white" />
        ) : (
          <FaBars size={24} className="text-white" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm transition-all duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-emerald-800 to-emerald-900 text-white w-72 transform transition-all duration-300 ease-in-out z-40 shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white bg-emerald-700 p-4 rounded-lg shadow-md text-center">
              ReviewMe
            </h2>
          </div>
          
          <nav>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="flex items-center py-3 px-6 hover:bg-emerald-700 rounded-lg transition-all duration-200 group"
                  onClick={() => window.innerWidth < 768 && toggleSidebar()}
                >
                  <FaHome className="mr-3 text-emerald-300 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/reviews" 
                  className="flex items-center py-3 px-6 hover:bg-emerald-700 rounded-lg transition-all duration-200 group"
                  onClick={() => window.innerWidth < 768 && toggleSidebar()}
                >
                  <FaClipboardList className="mr-3 text-emerald-300 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Reviews</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/companies" 
                  className="flex items-center py-3 px-6 hover:bg-emerald-700 rounded-lg transition-all duration-200 group"
                  onClick={() => window.innerWidth < 768 && toggleSidebar()}
                >
                  <FaBuilding className="mr-3 text-emerald-300 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Companies</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className="flex items-center py-3 px-6 hover:bg-emerald-700 rounded-lg transition-all duration-200 group"
                  onClick={() => window.innerWidth < 768 && toggleSidebar()}
                >
                  <FaUser className="mr-3 text-emerald-300 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Profile</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;