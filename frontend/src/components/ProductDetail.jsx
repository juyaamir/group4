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
    return <tr><td colSpan="4">{error}</td></tr>;
  }

  if (!product) {
    return <tr><td colSpan="4">Loading product details...</td></tr>;
  }

  return (
    <tr key={product._id}>
      <td>{product._id}</td>
      <td>{product.productname}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
    </tr>
  );
};

export default ProductDetail;
