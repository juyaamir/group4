import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const UpdataProduct = (itemid) => {
  const id = itemid["itemid"];
  // console.log(id);

  const [updateFormData, setUpdateFormData] = useState({
    productname: "",
    price: "",
    category: "",
  });

  const { productname, price, category } = updateFormData;

  const handleChange1 = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  ///Create Product//
  const handleSubmit1 = (e) => {
    // e.preventDefault();
    // axios.post(`http://localhost:8000/api/v1/product/${newitem}`);
    axios
      .put(`http://localhost:8000/api/v1/product/${id}`, updateFormData)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit1}
        className="flex flex-col border border-2  "
      >
        <div className="flex-col">
          <h2 className="text-center text-xl font-bold">Edit</h2>
          <label for="name">Enter Product Name </label>
          <input
            className="border border-2 m-5"
            type="text"
            name="productname"
            id="productname"
            onChange={handleChange1}
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
            onChange={handleChange1}
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
            onChange={handleChange1}
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

export default UpdataProduct;
