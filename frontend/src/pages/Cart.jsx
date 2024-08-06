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
/* import { priceContext } from "../App";
import { useContext } from "react"; */

const Cart = ({
  productArray,
  setProductArray,
  productPrice,
  setProductPrice,
  productCount,
  setProductCount,
}) => {
  const [error, setError] = useState(null);
  /*   const setProductPrice = useContext(priceContext); */

  const [productDesc, setProductDesc] = useState([]);
  const [productduplicate, setProductduplicate] = useState([]);

  const deleteProduct = (PId) => {
    var index = productArray.indexOf(PId);
    /*   var indexprice = productPrice.indexOf(PId); */
    productArray.splice(index, 1);
    /*     productPrice.splice(indexprice, 1); */
    // favArray.remove(id);
    setProductArray([...productArray]);
    setProductCount(productArray.length);
  };
  /*  const addProduct = (PId) => {
    setProductArray((current) => [...current, PId]);

    setProductCount(length + 1);
    // console.log(length);
  }; */
  const [list, setList] = useState(productArray); // Example list

  function countOccurrences(arr) {
    return arr.reduce((counts, item) => {
      counts[item] = (counts[item] || 0) + 1;
      return counts;
    }, {});
  }

  const result = countOccurrences(list);
  console.log(result);

  /*  const total = productDesc?.map((item) => {
    item._id;
  }); */
  const total = productDesc?.reduce(
    (acc, item) => acc + item.price * result[item._id],
    0
  );
  setProductPrice(total);

  useEffect(() => {
    axios
      .post(`http://localhost:8000/api/v1/product`, { productArray })
      // .then((response) => setUser(response.data))
      .then((response) => setProductDesc(response.data))

      .catch((err) => {
        console.error(err);
      });
  }, [productArray]);

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
                <li>
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
              productDesc?.map((item, key) => (
                <tbody>
                  <tr key={item._id}>
                    <td>
                      <strong>{item.productname}</strong>
                    </td>
                    <td>
                      <strong>{item.price}&nbsp; €</strong>
                    </td>

                    <td>
                      <Image width={50} src={item.image} />
                    </td>
                    <td>
                      {/*  <button
                        onClick={() => {
                          addProduct(item._id);
                        }}
                      >
                        <FaPlus />
                      </button> */}

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
            <strong>&nbsp;{productPrice}</strong>
          </div>
          <div className="max-w-full text-end px-16 py-2 ">
            <Link to="/purchase">
              <button className="btn btn-outline btn-success">Proceed to checkout</button>
            </Link>
          </div>
        </div>
        {/*  <div> Products from Cart{productArray?.map((item) => item)}</div>; */}
      </Watermark>
    </>
  );
};

export default Cart;
