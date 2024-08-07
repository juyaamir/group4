import { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "antd";
import { Watermark } from "antd";
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import { Space, Typography, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Userinfo from "../components/Userinfo";
import { Link } from "react-router-dom";

const Cart = ({
  productArray,
  setProductArray,
  productPrice,
  setProductPrice,
  productCount,
  setProductCount,
}) => {
  const URL = import.meta.env.VITE_APP_URL;
  const [error, setError] = useState(null);
  const [productDesc, setProductDesc] = useState([]);
  const [productduplicate, setProductduplicate] = useState([]);

  const deleteProduct = (PId) => {
    var index = productArray.indexOf(PId);
    productArray.splice(index, 1);
    setProductArray([...productArray]);
    setProductCount(productArray.length);
  };

  const [list, setList] = useState(productArray);

  function countOccurrences(arr) {
    return arr.reduce((counts, item) => {
      counts[item] = (counts[item] || 0) + 1;
      return counts;
    }, {});
  }

  const result = countOccurrences(list);

  useEffect(() => {
    axios
      .post(`${URL}/api/v1/product`, { productArray })
      .then((response) => setProductDesc(response.data))
      .catch((err) => {
        console.error(err);
      });
  }, [productArray]);

  useEffect(() => {
    const total = productDesc?.reduce(
      (acc, item) => acc + item.price * result[item._id],
      0
    );
    setProductPrice(total);
  }, [productDesc, result, setProductPrice]);

  return (
    <>
      <Watermark content={["Journey Pack", "Happy Traveling"]}>
        <div className="overflow-x-auto mx-72 align-center  rounded-md px-4 m-16">
          <div className="p-1 flex flex-row flex-wrap gap-6 ">
            <Userinfo />
          </div>

          <div className="md:hidden lg:hidden">
            <ul>
              {productDesc?.map((item) => (
                <li key={item._id}>
                  {item.productname} : {item.price}
                </li>
              ))}
              <li>{productPrice}</li>
            </ul>
          </div>

          <table className="table border border-2 ">
            <thead>
              <tr className="text-md">
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            {productDesc &&
              productDesc?.map((item) => (
                <tbody key={item._id}>
                  <tr>
                    <td>
                      <strong>{item.productname}</strong>
                    </td>
                    <td>
                      <strong>{item.price}&nbsp; €</strong>
                    </td>
                    <td>
                      <Image width={50} src={item.image} />
                    </td>
                    <td></td>
                    <td>
                      {result[item._id]}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          deleteProduct(item._id);
                        }}
                      >
                        <TiMinus />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>

          <div className="max-w-full text-end px-16 py-2">
            Total Price:
            <strong>&nbsp;{productPrice}&nbsp;€</strong>
          </div>
          <div className="max-w-full text-end px-16 py-2 ">
            <Link to="/purchase">
              <button className="border border-gray-300 bg-green-600 hover:bg-green-800 rounded-lg mx-auto block text-white p-2 my-2 px-4">Proceed to checkout</button>
              
            </Link>
          </div>
        </div>
      </Watermark>
    </>
  );
};

export default Cart;