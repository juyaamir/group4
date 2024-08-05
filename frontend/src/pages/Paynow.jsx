import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Table } from "antd";

const Paynow = ({ productPrice, productArray, setProductCount }) => {
  const id = localStorage.getItem("userId");
  const [orderhistory, setOrderhistory] = useState([]);
  const [payload, setPayload] = useState({
    userid: id,
    price: productPrice,
    productId: productArray,
  });

  // console.log(productArray);
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/v1/order", payload)
      .then((response) => {
        console.log("Response:", response.data);
      })

      .catch((error) => {
        console.error("Error:", error);
      });

    setProductCount(0);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/order/${id}`)
      .then((response) => setOrderhistory(response.data))
      .catch((err) => {
        console.error(err);
        setError("Error fetching user data");
      });
  }, []);
  return (
    <div className="bg-base-100 text-center border border-2 m-24">
      <h2 className="text-blue">
        Congratulation ! You Ordered Successfully ..
      </h2>
      <h3>Your Order History</h3>
      {orderhistory.map((item) => item.price)}
    </div>
  );
};

export default Paynow;
