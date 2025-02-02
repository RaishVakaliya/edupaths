import React, { createContext, useContext, useState, useEffect } from 'react';
import SummaryApi from '../api/SummaryApi';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Failed to load user details');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCart = async () => {
    if (!user) return;
    
    try {
      const response = await fetch(`${SummaryApi.BASE_URL}/user/cart`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  };

  // Initialize user data
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    error,
    cart,
    setCart,
    fetchUserDetails
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 