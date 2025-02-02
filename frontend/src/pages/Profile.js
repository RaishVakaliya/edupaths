import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiBriefcase, FiMapPin, FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import config from '../config/config';
import { getProfilePicUrl } from '../utils/helpers';

const Profile = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?._id) {
        console.log('No user ID available:', auth); // Debug log
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching profile for user ID:', user._id); // Debug log
        const response = await fetch(`${config.API_URL}/api/user/profile`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Profile response status:', response.status); // Debug log
        const data = await response.json();
        console.log('Profile response data:', data); // Debug log

        if (data.success) {
          setProfileData(data.data);
          setError(null);
        } else {
          throw new Error(data.message || 'Failed to fetch profile data');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    if (auth?.isAuthenticated) {
      fetchProfileData();
    } else {
      setLoading(false);
    }
  }, [user, auth?.isAuthenticated]);

  if (!auth?.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to view your profile.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            Go to Login
          </button>
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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600">Unable to load profile data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Profile Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <button
              onClick={() => navigate('/edit-profile')}
              className="flex items-center text-emerald-600 hover:text-emerald-700"
            >
              <FiEdit className="mr-2" />
              Edit Profile
            </button>
          </div>

          {/* Profile Picture and Name */}
          <div className="flex items-center mb-6">
            <img
              src={getProfilePicUrl(profileData?.profilePicture) || 'https://via.placeholder.com/150'}
              alt={profileData?.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="ml-6">
              <h2 className="text-2xl font-semibold text-gray-900">{profileData?.name}</h2>
              <p className="text-gray-600">{profileData?.role}</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <FiUser className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-gray-900">{profileData.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiMail className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{profileData.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information (for employees) */}
          {profileData.role === 'employee' && (
            <div className="border-t mt-6 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
              <div className="space-y-4">
                {profileData.jobTitle && (
                  <div className="flex items-center">
                    <FiBriefcase className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Job Title</p>
                      <p className="text-gray-900">{profileData.jobTitle}</p>
                    </div>
                  </div>
                )}
                {profileData.company && (
                  <div className="flex items-center">
                    <FiBriefcase className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="text-gray-900">{profileData.company}</p>
                    </div>
                  </div>
                )}
                {profileData.location && (
                  <div className="flex items-center">
                    <FiMapPin className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900">{profileData.location}</p>
                    </div>
                  </div>
                )}
                {profileData.skills && profileData.skills.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;