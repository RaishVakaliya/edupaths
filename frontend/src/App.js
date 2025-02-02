import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "./common";
import { useEffect } from "react";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import Companies from './pages/Companies';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import EmployeeProfile from './pages/EmployeeProfile';
import EditProfile from './pages/EditProfile';

function App() {
  const [ProductCount, setProductCount] = useState(0);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
    // console.log("dataApi", dataApi);
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.CartProductCount.url, {
      method: SummaryApi.CartProductCount.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    setProductCount(dataApi?.data?.count); //this count is come from user controller->CountCartProduct
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    /* user details */
    fetchUserDetails();
    // user cart product details
    // fetchUserAddToCart();
  });

  return (
    <UserProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
        <ToastContainer position="top-right" autoClose={3000} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1">
          <Navbar onSearch={handleSearch} />
          <main className="p-6">
            <div className="mt-16 max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Home searchQuery={searchQuery} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/employee/:id" element={<EmployeeProfile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
