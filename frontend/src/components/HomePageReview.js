import React from 'react';

const HomePageReview = () => {
  // Dummy data for recent reviews
  const recentReviews = [
    {
      id: 1,
      companyName: 'Tech Solutions Inc.',
      rating: 4.5,
      reviewTitle: 'Great work environment and culture',
      review: 'The company has an amazing work culture with great opportunities for growth. Work-life balance is respected.',
      author: 'John Doe',
      position: 'Software Engineer',
      date: '2 days ago'
    },
    {
      id: 2,
      companyName: 'Digital Innovations',
      rating: 5,
      reviewTitle: 'Excellent learning experience',
      review: 'Supportive team members and lots of opportunities to learn new technologies. Management is very approachable.',
      author: 'Jane Smith',
      position: 'Product Manager',
      date: '1 week ago'
    },
    {
      id: 3,
      companyName: 'Future Systems',
      rating: 4,
      reviewTitle: 'Professional growth opportunities',
      review: 'Great place to build your career. Regular training sessions and mentorship programs available.',
      author: 'Mike Johnson',
      position: 'Data Analyst',
      date: '2 weeks ago'
    }
  ];

  return (
    <div className="space-y-6">
      {recentReviews.map((review) => (
        <div
          key={review.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 hover:text-emerald-600 transition-colors duration-300">
                {review.companyName}
              </h3>
              <div className="flex items-center mt-1 space-x-1">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-500 ml-2">{review.rating.toFixed(1)}</span>
              </div>
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>

          <h4 className="text-lg font-medium text-gray-800 mb-2">{review.reviewTitle}</h4>
          <p className="text-gray-600 mb-4">{review.review}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-semibold">
                  {review.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{review.author}</p>
                <p className="text-xs text-gray-500">{review.position}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors duration-300">
                Helpful
              </button>
              <span className="text-gray-300">|</span>
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300">
                Share
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePageReview; 