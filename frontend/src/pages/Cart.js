import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import "./addRemoveBtn.css";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.ProductCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.viewCartProduct.url, {
      method: SummaryApi.viewCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setdata(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setloading(true);
    handleLoading();
    setloading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const dataResponse = await response.json();

    if (dataResponse.success) {
      fetchData();
    }
  };

  const decreaaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const dataResponse = await response.json();

    if (dataResponse.success) {
      fetchData();
      // context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.yearofexperience,
    0
  );

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="py-5 bg-white">no Product added in Cart</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                  <div
                    className="h-32 w-full bg-slate-200 my-2 border border-slate-300 animate-pulse"
                    key={el + index}
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    className="h-32 w-full bg-white my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                    key={product?._id + index}
                  >
                    {" "}
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-1 relative">
                      <div
                        className="absolute right-0 text-red-600 rounded-full cursor-pointer hover:bg-red-600 p-2 hover:text-white"
                        onClick={() => {
                          deleteCartProduct(product?._id);
                        }}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {/* {product?.productId?.productName} */}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>


                      <div className="flex items-center gap-3">
                        <button
                          className="vista-button"
                          onClick={() => {
                            decreaaseQty(product?._id, product?.quantity);
                          }}
                        >
                          <div>−</div>
                        </button>
                        <span className="">{product?.quantity}</span>
                        <button
                          className="vista-button"
                          onClick={() => {
                            increaseQty(product?._id, product?.quantity);
                          }}
                        >
                          <div>+</div>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* summary of cart */}
        {data.length > 0 && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border my-2 border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-red-600 my-2 px-4 py-1">
                  Summary
                </h2>
                <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
