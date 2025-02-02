import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState({
    productName: "",
    companyName: "",
    category: "",
    productImage: [],
    description: "",
    AfterSubject: "",
    yearofexperience: "",
  });

  const params = useParams();
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setactiveImage] = useState("");
  const [zoomImageCoordinate, setzoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomimage, setzoomimage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);

  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setloading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setloading(false);
    const dataResponse = await response.json();

    setdata(dataResponse?.data);
    setactiveImage(dataResponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setactiveImage(imageURL);
  };

  const handleZoomImage = (e) => {
    setzoomimage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setzoomImageCoordinate({
      x,
      y,
    });
  };

  const handleLeaveImagezoom = () => {
    setzoomimage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    // fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    // fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="lg:h-96 lg:w-96 bg-slate-200 h-[300px] w-[300px] relative p-2">
            <img
              src={activeImage}
              alt=""
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImagezoom}
            />

            {/* product zoom */}
            {zoomimage && (
              <div className="hidden lg:block min-w-[500px] min-h-[400px] p-1 overflow-hidden bg-slate-200 absolute -right-[510px] top-0 z-20">
                <div
                  className="h-full w-full mix-blend-multiply min-h-[400px] min-w-[500px] scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {
              // loading state
              loading ? (
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                  {" "}
                  {productImageListLoading.map((el, index) => {
                    return (
                      <div
                        className="h-20 w-20 rounded bg-slate-200 animate-pulse"
                        key={"loadingimage" + index}
                      ></div>
                    );
                  })}
                </div>
              ) : (
                // loaded state
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                  {" "}
                  {data?.productImage?.map((imgUrl, index) => {
                    return (
                      <div
                        className="h-20 w-20 rounded bg-slate-200 p-1"
                        key={imgUrl}
                      >
                        <img
                          src={imgUrl}
                          alt=""
                          className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
                          onMouseEnter={() => {
                            handleMouseEnterProduct(imgUrl);
                          }}
                          onClick={() => {
                            handleMouseEnterProduct(imgUrl);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )
            }
          </div>
        </div>

        {/* product details */}
        {loading ? (
          // loading state
          <div className="flex flex-col gap-1.5">
            <p className="bg-slate-200 animate-pulse h-6 w-full rounded-full"></p>
            <h2 className="bg-slate-200 animate-pulse h-6 w-full rounded-full"></h2>
            <p className="bg-slate-200 animate-pulse min-w-[100px] h-6 rounded-full"></p>
            <div className="flex bg-slate-200 h-6 animate-pulse rounded-full"></div>

            <div className="flex gap-2 my-1 h-6 animate-pulse">
              <p className="bg-slate-200 h-6 w-full rounded-full animate-pulse"></p>
              <p className="bg-slate-200 h-6 w-full rounded-full animate-pulse"></p>
            </div>

            <div className="flex my-1 gap-3">
              {/* Buy button */}
              <button className="bg-slate-200 animate-pulse cursor-default w-32 p-2 h-12 rounded-md"></button>

              {/* Add to Cart button */}

              <button className="bg-slate-200 animate-pulse cursor-default w-32 p-2 h-12 rounded-md"></button>
            </div>

            <div className="grid gap-1">
              <p className="my-1 h-6 bg-slate-200 animate-pulse rounded-full"></p>
              <p className="h-6 bg-slate-200 animate-pulse rounded-full"></p>
            </div>
          </div>
        ) : (
          // loaded state
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {/* {data?.productName} */}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.companyName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>
            <div className="gap-1 text-red-600 flex items-center">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>



            <div className="flex items-center my-2 gap-3">
              {/* Buy button */}
              {/* <button
                className="overflow-hidden w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
                onClick={(e) => {
                  handleBuyProduct(e, data?._id);
                }}
              >
                Buy
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left" />
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left" />
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left" />
                <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  Buy
                </span>
              </button> */}

              {/* Add to Cart button */}

              {/* <button
                className="overflow-hidden w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
                onClick={(e) => {
                  handleAddToCart(e, data?._id);
                }}
              >
                Add to Cart
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right" />
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right" />
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right" />
                <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 whitespace-nowrap">
                  Add to Cart
                </span>
              </button> */}
            </div>

            <div>
              <p className="my-1 text-slate-600 font-medium">Description : </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data?.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
