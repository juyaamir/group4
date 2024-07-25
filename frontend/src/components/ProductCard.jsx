import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductCard = (c) => {
  const [productItem, setProductItem] = useState([]);

  //console.log(c["category"]);
  let category = c["category"];

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/product?category=${category}`)
      .then((response) => {
        setProductItem(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(productItem.map((item) => item._id));
  console.log(productItem.map((item) => item.productname));
  console.log(productItem.map((item) => item.price));
  console.log(productItem.map((item) => item.category));

  const itemcategory = productItem.map((item) => item.category);

  return (
    <div className="flex gap-4">
      {productItem?.map((item) => (
        <div
          key={item._id}
          className="card card-compact bg-base-100 w-60 shadow-xl"
        >
          <figure>
            <img src="" alt={item.category} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.productname}</h2>
            <p>Price :{item.price} </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
          <button className="btn btn-xs my-1">Edit</button>
          <button className="btn btn-xs">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
