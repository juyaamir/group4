import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductDetail from "../components/ProductDetail";

const OrderHistory = ({ user }) => {
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
    return <div>{error}</div>;
  }

  return (
    <>
      <h2 className="pl-10 mb-0">Orders History</h2>
      <div className="w-100 vh-100 d-flex flex-col justify-center items-center border border-1 rounded-md m-8">
        {orderHistory.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <React.Fragment key={order._id}>
                  <tr>
                    <td>{order._id}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>{order.price}</td>
                    <td>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.productId?.map((product) => (
                            <ProductDetail key={product._id} productId={product._id} />
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </>
  );
};

export default OrderHistory;