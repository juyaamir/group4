import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch order history
      axios
        .get(`http://localhost:8000/api/v1/usersaccounts/${id}/orders`)
        .then((response) => {
          setOrderHistory(response.data);
          const productIds = response.data.flatMap(order => order.products);
          console.log('Product IDs:', productIds); // Log product IDs
          fetchProductDetails(productIds);
        })
        .catch((err) => {
          console.error(err);
          setError("Error fetching order history");
        });
    }
  }, [id]);

  const fetchProductDetails = (productIds) => {
    const uniqueProductIds = [...new Set(productIds)]; // Remove duplicates
    console.log('Unique Product IDs:', uniqueProductIds); // Log unique product IDs
    Promise.all(uniqueProductIds.map(id => 
      axios.get(`http://localhost:8000/api/v1/product/${id}`)
        .then(response => {
          console.log(`Product ${id} data:`, response.data); // Log product data
          return { id, data: response.data };
        })
        .catch(err => {
          console.error(`Error fetching product ${id}`, err);
          return { id, data: null };
        })
    )).then(results => {
      const details = results.reduce((acc, result) => {
        if (result.data) {
          acc[result.id] = result.data;
        }
        return acc;
      }, {});
      console.log('Product Details:', details); // Log final product details
      setProductDetails(details);
    });
  };

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
          orderHistory.map((order) => (
            <div key={order._id} className="order-item">
              <h3>Order ID: {order._id}</h3>
              <p>Date: {formatDate(order.createdAt)}</p>
              <h4>Total: {order.price}</h4>
              <h4>Products:</h4>
              <ul>
                {order.products && order.products.length > 0 ? (
                  order.products.map((productId) => {
                    const product = productDetails[productId];
                    return product ? (
                      <li key={product._id}>
                        <p>Product Name: {product.productname}</p>
                        <p>Price: {product.price}</p>
                        <p>Category: {product.category}</p>
                      </li>
                    ) : (
                      <li key={productId}>Loading product details...</li>
                    );
                  })
                ) : (
                  <p>No product details available for this order.</p>
                )}
              </ul>
              <hr />
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </>
  );
};

export default OrderHistory;