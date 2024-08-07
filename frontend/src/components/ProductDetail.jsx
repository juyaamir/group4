import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "antd";

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productId) {
      // Fetch product details
      axios
        .get(`http://localhost:8000/api/v1/product/${productId}`)
        .then((response) => {
          //  console.log("Product detail response:", response.data); // Log the response for debugging
          setProduct(response.data);
        })
        .catch((err) => {
          console.error(err);
          setError("Error fetching product details");
        });
    }
  }, [productId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="border-bottom rounded-md p-4 mb-4">
      <div className="flex items-center border border-4">
        <Image width={100} src={product.image} className="mr-4" />
        <div className="pl-8">
          <p className="font-semibold m-2">
            Product Name: {product.productname}
          </p>
          <p className="font-semibold m-2">Price: {product.price}&nbsp;€</p>
          <p className="font-semibold m-2">Category: {product.category}</p>
          <p className="font-semibold m-2">
            Product Id: &nbsp;{product._id}&nbsp;
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
