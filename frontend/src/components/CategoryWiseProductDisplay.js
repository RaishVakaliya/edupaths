import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
// import "./CartBtn.css";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import scrollTop from "../helpers/scrollTop";

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const loadingList = new Array(13).fill(null);

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

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
                  key={"product" + index}
                >
                  <div className="bg-slate-300 h-48 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis py-2 line-clamp-1 text-black animate-pulse p-1 rounded-full bg-slate-200"></h2>
                    <p className="capitalize text-slate-500 animate-pulse py-2 p-1 rounded-full bg-slate-200"></p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium py-2 animate-pulse p-1 rounded-full bg-slate-200 w-full"></p>
                      <p className="text-slate-500 line-through py-2 animate-pulse p-1 rounded-full bg-slate-200 w-full"></p>
                    </div>

                    {/*  */}
                    <button className="px-6 py-2 animate-pulse rounded-full bg-slate-200 cursor-default">
                      <div className="">
                        <div className="button-wrapper">
                          <div className="text">View</div>
                        </div>
                      </div>
                    </button>

                    {/*  */}
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"/product/" + product?._id}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
                  key={"product" + index}
                  onClick={scrollTop}
                >
                  <div className="bg-slate-300 h-48 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center">
                    <img
                      src={product?.productImage[0]}
                      alt=""
                      className="h-full object-scale-down transition-all hover:scale-110 mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>

                    {/* cart button */}
                    <button
                      className="px-1.6 py-0.5"
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

export default CategoryWiseProductDisplay;
