import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

const AdminProductCard = ({ data, fetchdata }) => {
  const [EditProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white rounded p-4">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            alt=""
            src={data?.productImage[0]}
            width={120}
            height={120}
            className="mx-auto object-fill h-full"
          />
        </div>
        {/* <h1 className="text-ellipsis line-clamp-2">{data?.productName}</h1> */}
        <div>
          <div
            className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-500 cursor-pointer rounded-full hover:text-white"
            onClick={() => {
              setEditProduct(true);
            }}
          >
            <MdEdit />
          </div>
        </div>
      </div>

      {EditProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => {
            setEditProduct(false);
          }}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
