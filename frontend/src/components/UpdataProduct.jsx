import axios from "axios";
import { useState } from "react";

const UpdataProduct = ({ itemid, ct }) => {
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

    console.log(updateFormData);
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/product/${itemid}`,
        updateFormData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit1} className="flex flex-col border-1">
        <div className="flex-col px-2 my-2">
          <h2 className="text-center text-xl font-bold">Edit</h2>
          {/*  <label htmlFor="productname">Enter Product Name </label> */}
          <input
            className="input input-bordered input-md w-full max-w-xs"
            type="text"
            name="productname"
            id="productname"
            placeholder="Enter Product Name"
            onChange={handleChange1}
            value={productname}
            required
          />
        </div>
        <div className="px-2 my-2">
          {/* <label htmlFor="price">Enter Product Price </label> */}
          <input
            className="input input-bordered input-md w-full max-w-xs "
            type="text"
            name="price"
            id="price"
            placeholder="Enter Product Price"
            onChange={handleChange1}
            value={price}
            required
          />
        </div>
        <div className="px-4">
          <input
            className="border border-2 "
            type="radio"
            name="category"
            id="category"
            onChange={handleChange1}
            value={ct}
          />
          <label htmlFor="category">&nbsp;{ct}</label>
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
