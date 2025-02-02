import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import AllProducts from "./AllProducts";
import { Link } from "react-router-dom";
import HomePageReview from "../pages/homepagereview";
import { FaUserGraduate, FaBriefcase, FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white text-center py-12">
        <h1 className="text-4xl font-bold">
          Welcome to Student & Employee Hub
        </h1>
        <p className="mt-2 text-lg">
          A platform to connect students and employees for career growth
        </p>
      </header>

      {/* Sections */}
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8 mt-8">
        {/* Student Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <FaUserGraduate className="text-5xl text-blue-500 mx-auto" />
          <h2 className="text-2xl font-semibold mt-4">For Students</h2>
          <p className="text-gray-600 mt-2">
            Find career guidance, job reviews, and real-world experiences shared
            by employees.
          </p>
          {/* <Link
            to="/students"
            className="mt-4 inline-block bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
            Explore <FaArrowRight className="inline ml-2" />
          </Link> */}
        </div>

        {/* Employee Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <FaBriefcase className="text-5xl text-green-500 mx-auto" />
          <h2 className="text-2xl font-semibold mt-4">For Employees</h2>
          <p className="text-gray-600 mt-2">
            Share your job experiences, help students, and grow your
            professional network.
          </p>
          {/* <Link
            to="/employees"
            className="mt-4 inline-block bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
            >
            Get Started <FaArrowRight className="inline ml-2" />
          </Link> */}
        </div>
      </div>
      <HomePageReview />
      {/* Footer */}
      <BannerProduct />
      <footer className="text-center text-gray-700 mt-12 py-6">
        <p>&copy; 2025 Student & Employee Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
