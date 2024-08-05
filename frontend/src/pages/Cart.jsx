import { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "antd";

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
  const [list, setList] = useState(productArray); // Example list

  const getDuplicates = () => {
    const duplicates = findDuplicates(list);
    console.log("Duplicates:", duplicates);
    setProductduplicate(duplicates);
    // You can set the duplicates to state or use them as needed
  };

  // Function to find duplicates
  function findDuplicates(array) {
    const itemCounts = new Map();

    // Count the occurrences of each item
    array.forEach((item) => {
      itemCounts.set(item, (itemCounts.get(item) || 0) + 1);
    });

    // Filter items that occur more than once
    const duplicates = Array.from(itemCounts)
      .filter(([item, count]) => count > 1)
      .map(([item, count]) => item);

    return duplicates;
  }

  /*   const total = productDesc?.reduce((acc, item) => acc + item.price, 0);
  setProductPrice(total); */

  useEffect(() => {
    axios
      .post(`http://localhost:8000/api/v1/product`, { productArray })
      // .then((response) => setUser(response.data))
      .then((response) => setProductDesc(response.data))

      .catch((err) => {
        console.error(err);
      });
  }, [productArray]);
  useEffect(() => {
    getDuplicates();
  }, []);

  return (
    <>
      <div className="overflow-x-auto mx-20 border border-2 rounded-md p-4 m-16">
        <div className="p-14 flex flex-row gap-6">
          <Userinfo />
        </div>

        <div>
          <ul>
            {productArray?.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <button className="border border-2" onClick={() => {}}>
            Check for Duplicates
            {productduplicate}
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
            </tr>
          </thead>
          {productDesc &&
            productDesc?.map((item, key) => (
              <tbody>
                <tr>
                  <th key={item._id}>{item._id}</th>
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
                    <Button
                      type="dashed"
                      danger
                      onClick={() => {
                        deleteProduct(item._id);
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>

        {/* <div className="max-w-full text-end px-16 py-2">
          Total Price:
          <strong>&nbsp;{productPrice}</strong>
        </div> */}
        <div className="max-w-full text-end px-16 py-2 ">
          <Link to="/pay-now">
            <button className="btn btn-outline btn-success">Pay Now</button>
          </Link>
        </div>
      </div>
      {/*  <div> Products from Cart{productArray?.map((item) => item)}</div>; */}
    </>
  );
};

export default Cart;
