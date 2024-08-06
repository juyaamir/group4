import { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "antd";
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Userinfo from "../components/Userinfo";

const Cart = ({
  productArray,
  setProductArray,
  productPrice,
  setProductPrice,
  productCount,
  setProductCount,
}) => {
  const [productDesc, setProductDesc] = useState([]);
  const [error, setError] = useState(null);

  const deleteProduct = (PId) => {
    const updatedArray = productArray.filter((id) => id !== PId);
    setProductArray(updatedArray);
    setProductCount(updatedArray.length);
  };

  const addProduct = (PId) => {
    setProductArray((current) => [...current, PId]);
    setProductCount(productArray.length + 1);
  };

  const countOccurrences = (arr) => {
    return arr.reduce((counts, item) => {
      counts[item] = (counts[item] || 0) + 1;
      return counts;
    }, {});
  };

  const result = countOccurrences(productArray);

  useEffect(() => {
    axios
      .post(`http://localhost:8000/api/v1/product`, { productArray })
      .then((response) => setProductDesc(response.data))
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [productArray]);

  useEffect(() => {
    const total = productDesc.reduce(
      (acc, item) => acc + item.price * result[item._id],
      0
    );
    setProductPrice(total);
  }, [productDesc, result, setProductPrice]);

  return (
    <>
      <Watermark content={["Journey Pack", "Happy Traveling"]}>
        <div className="overflow-x-auto mx-72 align-center rounded-md px-4 m-16">
          <div className="p-1 flex flex-row flex-wrap gap-6">
            <Userinfo />
          </div>

          <div className="md:hidden lg:hidden">
            <ul>
              {productDesc.map((item) => (
                <li key={item._id}>
                  {item.productname} : {item.price} €
                </li>
              ))}
              <li>Total: {productPrice} €</li>
            </ul>
          </div>

          <table className="table border border-2">
            <thead>
              <tr className="text-md">
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {productDesc.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.productname}</strong>
                  </td>
                  <td>
                    <strong>{item.price} €</strong>
                  </td>
                  <td>{result[item._id]}</td>
                  <td>
                    <button onClick={() => addProduct(item._id)}>
                      <FaPlus />
                    </button>
                    <button onClick={() => deleteProduct(item._id)}>
                      <TiMinus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="max-w-full text-end px-16 py-2">
            Total Price: <strong>{productPrice} €</strong>
          </div>
          <div className="max-w-full text-end px-16 py-2">
            <Link to="/pay-now">
              <button className="btn btn-outline btn-success">Pay Now</button>
            </Link>
          </div>
        </div>
      </Watermark>
    </>
  );
};

export default Cart;