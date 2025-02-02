import React from 'react';

const Reviews = () => {
  // Dummy data for demonstration
  const reviews = [
    {
      id: 1,
      company: "Tech Corp",
      rating: 4.5,
      title: "Great work environment",
      review: "Amazing culture and work-life balance. The team is very supportive.",
      author: "John Doe",
      date: "2024-03-15"
    },
    // Add more review objects here
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Company Reviews</h1>
        <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300">
          Write a Review
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search companies..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
            <option>All Industries</option>
            <option>Technology</option>
            <option>Finance</option>
            <option>Healthcare</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
            <option>Rating: All</option>
            <option>5 Stars</option>
            <option>4+ Stars</option>
            <option>3+ Stars</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
            <option>Most Recent</option>
            <option>Highest Rated</option>
            <option>Lowest Rated</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{review.company}</h3>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-gray-500 text-sm">{review.date}</span>
            </div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">{review.title}</h4>
            <p className="text-gray-600 mb-4">{review.review}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">By {review.author}</span>
              <div className="flex space-x-2">
                <button className="text-emerald-600 hover:text-emerald-700">
                  Helpful
                </button>
                <button className="text-gray-500 hover:text-gray-600">
                  Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-emerald-50 text-gray-700">
            Previous
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
            1
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-emerald-50 text-gray-700">
            2
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-emerald-50 text-gray-700">
            3
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-emerald-50 text-gray-700">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Reviews; 