const BASE_URL = "http://localhost:5000/api"; // Make sure this matches your backend port

const SummaryApi = {
  // Authentication endpoints
  signIn: {
    url: `${BASE_URL}/auth/login`,
    method: "POST",
  },
  signUp: {
    url: `${BASE_URL}/auth/register`,
    method: "POST",
  },
  signOut: {
    url: `${BASE_URL}/auth/logout`,
    method: "POST",
  },

  // User related endpoints
  getUserProfile: {
    url: `${BASE_URL}/user/profile`,
    method: "GET",
  },
  updateUserProfile: {
    url: `${BASE_URL}/user/profile`,
    method: "PUT",
  },

  // Review related endpoints
  getReviews: {
    url: `${BASE_URL}/reviews`,
    method: "GET",
  },
  createReview: {
    url: `${BASE_URL}/reviews`,
    method: "POST",
  },
  updateReview: (reviewId) => ({
    url: `${BASE_URL}/reviews/${reviewId}`,
    method: "PUT",
  }),
  deleteReview: (reviewId) => ({
    url: `${BASE_URL}/reviews/${reviewId}`,
    method: "DELETE",
  }),

  // Company related endpoints
  getCompanies: {
    url: `${BASE_URL}/companies`,
    method: "GET",
  },
  getCompanyDetails: (companyId) => ({
    url: `${BASE_URL}/companies/${companyId}`,
    method: "GET",
  }),

  // Add any other API endpoints you need
};

export default SummaryApi; 