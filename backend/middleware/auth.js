const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;
    
    console.log('Auth middleware - Token:', token ? 'Present' : 'Not present');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Auth middleware - Decoded user:', decoded);
      
      // Add user from payload
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = auth; 