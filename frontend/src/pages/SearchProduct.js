import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import SearchVerticalCard from "../components/SearchVerticalCard";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  console.log("query", query.search);

  const fetchProduct = async () => {
    setloading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search);
    const dataResponse = await response.json();
    setloading(false);

    setdata(dataResponse.data);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return(
    <div className="container mx-auto p-4">

      {
        loading && (
          <p className="text-lg text-center">loading...</p>
        )
      }
      
      <p className="text-lg font-semibold my-3">Search Results : {data.length}</p>

      {
        data.length === 0 && !loading && (
          <p className="text-center text-lg bg-white p-4">No Product Found </p>
        )
      }

      {
        data.length !== 0 && !loading && (
          <SearchVerticalCard loading={loading} data={data}/>
        )
      }

    </div>
  )
};

export default SearchProduct;
