import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setcategoryProduct] = useState([]);
  const [loading, setloading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryproduct = async () => {
    setloading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setloading(false);
    setcategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryproduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={"categoryLoading" + index}
                ></div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product.category}
                  className="cursor-pointer"
                  key={product.category + index}
                >
                  <div className="w-16 h-16 md:h-20 md:w-20 rounded-full p-4 bg-slate-200 overflow-hidden flex items-center justify-center">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="h-full object-scale-down mix-blend-multiply transition-all hover:scale-125"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
