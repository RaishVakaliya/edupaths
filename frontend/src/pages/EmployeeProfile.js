import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiMail, FiMapPin, FiBriefcase, FiLinkedin, FiGithub, FiGlobe, FiEdit } from 'react-icons/fi';

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/user/profile/${id}`, {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }

        const data = await response.json();

        if (data.success) {
          setEmployee(data.data);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch employee data');
        }
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setError('Failed to fetch employee details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployeeDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error || 'Employee not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative h-48 bg-emerald-600">
          {user && user._id === id && (
            <button
              onClick={() => navigate('/edit-profile')}
              className="absolute top-4 right-4 bg-white text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors flex items-center"
            >
              <FiEdit className="mr-2" />
              Edit Profile
            </button>
          )}
          <div className="absolute -bottom-16 left-8">
            <img
              src={employee.profilePicture || 'https://via.placeholder.com/150'}
              alt={employee.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
              <p className="text-xl text-emerald-600 mt-1">{employee.jobTitle || 'No job title specified'}</p>
            </div>
            <a
              href={`mailto:${employee.email}`}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
            >
              <FiMail className="mr-2" />
              Contact
            </a>
          </div>

          {/* Company & Location */}
          <div className="mt-6 space-y-2">
            {employee.company && (
              <div className="flex items-center text-gray-600">
                <FiBriefcase className="mr-2" />
                <span>{employee.company}</span>
              </div>
            )}
            {employee.location && (
              <div className="flex items-center text-gray-600">
                <FiMapPin className="mr-2" />
                <span>{employee.location}</span>
              </div>
            )}
          </div>

          {/* Bio */}
          {employee.bio && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-gray-600 whitespace-pre-line">{employee.bio}</p>
            </div>
          )}

          {/* Skills */}
          {employee.skills && employee.skills.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {employee.socialLinks && Object.values(employee.socialLinks).some(link => link) && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Connect</h2>
              <div className="flex space-x-4">
                {employee.socialLinks.linkedin && (
                  <a
                    href={employee.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-600"
                  >
                    <FiLinkedin className="w-6 h-6" />
                  </a>
                )}
                {employee.socialLinks.github && (
                  <a
                    href={employee.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-600"
                  >
                    <FiGithub className="w-6 h-6" />
                  </a>
                )}
                {employee.socialLinks.portfolio && (
                  <a
                    href={employee.socialLinks.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-600"
                  >
                    <FiGlobe className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Experience */}
          {employee.experience && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Experience</h2>
              <p className="text-gray-600">
                {employee.experience} {employee.experience === 1 ? 'year' : 'years'} of experience
              </p>
            </div>
          )}
        </div>

        {/* Job Opportunities Section */}
        {employee.jobPostings && employee.jobPostings.length > 0 && (
          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Opportunities</h2>
            <div className="space-y-4">
              {employee.jobPostings.map((job, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-gray-600 mt-2">{job.description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    Requirements: {job.requirements}
                  </div>
                  <button className="mt-3 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile; 