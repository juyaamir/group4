import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Paynow = ({ productPrice, productArray }) => {
  const id = localStorage.getItem("userId");
  const [payload, setPayload] = useState({
    userid: id,
    price: productPrice,
    productId: productArray,
  });

  console.log(productArray);
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/v1/order", payload)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return <div>Congratulation Your payment is successful</div>;
};

export default Paynow;
