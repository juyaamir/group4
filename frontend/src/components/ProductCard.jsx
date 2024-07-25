import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductCard = (c) => {
  const [productItem, setProductItem] = useState([]);
  //console.log(c["category"]);
  let category = c["category"];
  const [formData, setFormData] = useState({
    productname: "",
    price: "",
    category: category,
  });

  const { productname, price } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /*  const newdata = {
    productname: productname,
    price: price,
    category: category,
  }; */
  ///Create Product//
  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post(`http://localhost:8000/api/v1/product/${newitem}`);
    axios
      .post("http://localhost:8000/api/v1/product", formData)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  ///DELETE Product//
  const handleClick2 = (item) => {
    axios.delete(`http://localhost:8000/api/v1/product/${item}`);
  };

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

  /*   console.log(productItem.map((item) => item._id));
  console.log(productItem.map((item) => item.productname));
  console.log(productItem.map((item) => item.price));
  console.log(productItem.map((item) => item.category));

  const itemcategory = productItem.map((item) => item.category); */

  return (
    <div className="flex flex-col">
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
            <button
              className="btn btn-xs my-1"
              onClick={() => handleClick3(item._id)}
            >
              Edit
            </button>
            <div>
              <button
                className="btn btn-xs my-1"
                onClick={() => handleClick2(item._id)}
              >
                Delete {/* {item._id} */}
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border border-2 my-8 ">
        <div className="px-4">
          <h2 className="text-center text-xl font-bold">Add New Product</h2>
          <label for="name">Enter Product Name </label>
          <input
            className="border border-2 m-5"
            type="text"
            name="productname"
            id="productname"
            onChange={handleChange}
            value={productname}
            required
          />
        </div>
        <div className="px-4">
          <label for="price">Enter Product Price </label>
          <input
            className="border border-2 m-5"
            type="text"
            name="price"
            id="price"
            onChange={handleChange}
            value={price}
            required
          />
        </div>
        <div className="px-4">
          <label for="price">Product Category </label>
          <input
            className="border border-2 m-5"
            type="text"
            name="category"
            id="category"
            onChange={handleChange}
            value={category}
            required
          />
        </div>
        <div className="px-4">
          <input
            className="border border-solid rounded-md text-white bg-black p-2 my-6 justify-end"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
      {/*   <button
        className="border border-solid rounded-md text-white bg-black p-2 my-6 justify-end"
        onClick={() => handleClick1(newdata)}
      >
        Create New Product
      </button> */}
    </div>
  );
};

export default ProductCard;
