import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";

const Paynow = ({ productPrice, productArray, setProductCount }) => {
  const id = localStorage.getItem("userId");
  const [orderhistory, setOrderhistory] = useState([]);
  const [payload, setPayload] = useState({
    userid: id,
    price: productPrice,
    productId: productArray,
  });
  const navigate = useNavigate();

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

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/product");
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  const lastOrder = orderhistory && orderhistory[orderhistory.length - 1];

  return (
    <div className="bg-green-600 text-center border-2 w-1/2 mx-auto text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Congratulations! Your order has been received successfully.
      </h2>
      <p className="text-lg">
        You will receive an email confirmation shortly with the details of your
        order.
      </p>
      <h3>Your Order History</h3>
      {lastOrder && (
        <Table
          columns={[
            {
              title: "Order ID",
              dataIndex: "_id",
              key: "_id",
            },
            {
              title: "Price",
              dataIndex: "price",
              key: "price",
            },
            {
              title: "Product ID",
              dataIndex: "productId",
              key: "productId",
            },
          ]}
          dataSource={[lastOrder]}
        />
      )}
    </div>
  );
};

export default Paynow;
