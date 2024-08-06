import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductDetail from "../components/ProductDetail";

const OrderHistory = ({ userId }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch order history
      console.log(id);
      axios
        .get(`http://localhost:8000/api/v1/usersaccounts/${id}/orders`)
        .then((response) => {
          console.log("Order history response:", response.data); // Log the response for debugging
          setOrderHistory(response.data);
        })
        .catch((err) => {
          console.error(err);
          setError("Error fetching order history");
        });
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold pl-4 pb-4">Orders History</h2>
      <div className="bg-white p-4 m-4 border border-1 rounded-md ">
        {orderHistory.length > 0 ? (
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <div key={order._id} className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold">Order ID: {order._id}</h3>
                <p>Date: {formatDate(order.createdAt)}</p>
                <p>Total Amount: ${order.price}</p>
                <h4 className="font-semibold mt-2">Products:</h4>
                <div className="mt-2">
                  {order.productId.map((productId) => (
                    <ProductDetail key={productId} productId={productId} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No order history available.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
