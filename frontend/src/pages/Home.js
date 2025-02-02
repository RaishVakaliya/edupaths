import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiMapPin, FiBriefcase, FiLock } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth?.isAuthenticated;
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      fetchEmployees(currentPage);
    }
  }, [currentPage, isAuthenticated]);

  const fetchEmployees = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/employees?page=${page}`,
        {
          credentials: 'include'
        }
      );
      const data = await response.json();

      if (data.success) {
        setEmployees(data.data);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeClick = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <FiLock className="mx-auto text-6xl text-emerald-600 mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to EduPath
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with industry professionals and explore career opportunities.
            Please log in to view employee profiles and start your journey.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-8">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div
              key={employee._id}
              onClick={() => handleEmployeeClick(employee._id)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={employee.profilePicture}
                    alt={employee.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                    <p className="text-emerald-600">{employee.jobTitle}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <FiBriefcase className="mr-2" />
                    {employee.company}
                  </div>
                  {employee.location && (
                    <div className="flex items-center text-gray-600">
                      <FiMapPin className="mr-2" />
                      {employee.location}
                    </div>
                  )}
                </div>
                {employee.skills && employee.skills.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {employee.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-sm bg-emerald-100 text-emerald-800 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {employee.skills.length > 3 && (
                        <span className="px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                          +{employee.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No employees found. Try adjusting your search criteria.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;