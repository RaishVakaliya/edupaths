import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import DisplayImage from "../components/DisplayImage";

const HomePageReview = () => {
  const [reviews, setReviews] = useState([]);
  const [openFullScreen, setOpenFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const fetchReviews = async () => {
    const response = await fetch(SummaryApi.allProduct.url, {
      method: "GET",
    });
    const data = await response.json();
    setReviews(data?.data || []);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Employees Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-lg">
            <h3 className="font-bold">{review.companyName}</h3>
            <p className="text-sm text-gray-600">{review.category}</p>
            <p className="mt-2">{review.description}</p>

            <h4 className="font-semibold mt-2">Experience: {review.yearofexperience} years</h4>
            <h4 className="font-semibold mt-2">After Graduation Focus: {review.AfterSubject}</h4>
            <h4 className="font-semibold mt-2">Preparation Advice:</h4>
            <p className="text-gray-700">{review.suggestion}</p>

            {/* Display uploaded images */}
            {review.productImage?.length > 0 && (
              <div className="mt-3 flex gap-2">
                {review.productImage.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img}
                    alt="Uploaded"
                    className="w-20 h-20 object-cover cursor-pointer border"
                    onClick={() => {
                      setOpenFullScreen(true);
                      setFullScreenImage(img);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Full-Screen Image View */}
      {openFullScreen && (
        <DisplayImage
          onClose={() => setOpenFullScreen(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default HomePageReview;
