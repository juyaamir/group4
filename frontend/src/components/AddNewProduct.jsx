import React, { useState } from "react";
import axios from "axios";

const AddNewProduct = () => {
  const [formData, setFormData] = useState({
    productname: "",
    price: "",
    category: "",
  });

  const { productname, price, category } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  ///Create Product//
  const handleSubmit = (e) => {
    // e.preventDefault();
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

  return (
    <div>
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
    </div>
  );
};

export default AddNewProduct;
