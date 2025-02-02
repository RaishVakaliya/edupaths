import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
// import "./CartBtn.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const scrollElement = useRef(0);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddtoCart = async (e, id) => {
    await addToCart(e, id);
    // fetchUserAddToCart();
  };

  const fetchData = async () => {
    setloading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setloading(false);
    setdata(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-4 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white rounded-full shadow-md p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white rounded-full shadow-md p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {loading
          ? // Loading state
            loadingList.map((product, index) => {
              return (
                <div
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex"
                  key={"product" + index}
                >
                  <div className="bg-slate-300 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse rounded-full p-1"></h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                    <div className="flex gap-3 w-full">
                      <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>

                    {/*  */}
                    <button className="px-6 py-0.5 w-full bg-slate-200 rounded-full cursor-auto animate-pulse">
                      <div className="">
                        <div className="button-wrapper">
                          <div className="text"></div>
                          <span className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="bi bi-cart2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </button>

                    {/*  */}
                  </div>
                </div>
              );
            })
          : // Loaded state
            data?.map((product, index) => {
              return (
                <Link
                  to={"product/" + product?._id}
                  key={"product" + index}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex"
                >
                  <div className="bg-slate-300 h-full p-4 min-w-[120px] md:min-w-[145px]">
                    <img
                      src={product?.Image[0]}
                      alt=""
                      className="h-full object-scale-down transition-all hover:scale-110"
                    />
                  </div>
                  <div className="p-4 grid">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {/* {product?.productName} */}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>

                    {/*  */}
                    <button
                      className="px-6 py-0.5"
                      onClick={(e) => {
                        handleAddtoCart(e, product?._id);
                      }}
                    >
                      <div className="buttonClass">
                        <div className="button-wrapper">
                          <div className="text">View</div>
                        </div>
                      </div>
                    </button>

                    {/*  */}
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
