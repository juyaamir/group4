import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productId) {
      // Fetch product details
      axios
        .get(`http://localhost:8000/api/v1/product/${productId}`)
        .then((response) => {
          console.log("Product detail response:", response.data); // Log the response for debugging
          setProduct(response.data);
        })
        .catch((err) => {
          console.error(err);
          setError("Error fetching product details");
        });
    }
  }, [productId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="w-100 vh-100 d-flex flex-col justify-center items-center border border-1 rounded-md m-8">
      <table className="table">
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.productname}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetail;
