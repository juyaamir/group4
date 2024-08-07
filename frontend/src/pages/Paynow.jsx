import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import delivery from "../assets/dev.jpg";
import ProductDetail from "../components/ProductDetail";

const Paynow = ({ productPrice, productArray, setProductCount }) => {
  const URL = import.meta.env.VITE_APP_URL;
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
      .post(`${URL}/api/v1/order`, payload)
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
      .get(`${URL}/api/v1/order/${id}`)
      .then((response) => setOrderhistory(response.data))
      .catch((err) => {
        console.error(err);
        setError("Error fetching user data");
      });
  }, []);

  /*  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/product");
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);
 */
  const lastOrder = orderhistory && orderhistory[orderhistory.length - 1];

  return (
    /*   <div className="bg-green-600 text-center border-2 w-1/2 mx-auto text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Congratulations! Your order has been received successfully.
      </h2>
      <p className="text-lg">
        You will receive an email confirmation shortly with the details of your
        order.
      </p>
      <h3>Your Order History</h3>
      {lastOrder && lastOrder.productId}
    </div> */

    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${delivery})`,
      }}
    >
      <div className="hero"></div>
      <div className="hero-content  text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl text-left font-bold text-yellow">
            Congratulations! Your order has been received successfully.
          </h1>
          <p className="mb-5">
            You will receive an email confirmation shortly with the details of
            your order.
          </p>
          <div tabIndex={0} className="collapse bg-base-200">
            <div className="collapse-title text-xl font-medium text-Red">
              Your Order History
            </div>
            <div className="collapse-content text-black w-max-full">
              <p>{lastOrder && lastOrder?.userId}</p>
              <p className="text-blue">
                Total Amount : &nbsp;{lastOrder && lastOrder?.price}&nbsp;€
              </p>
              {/* <p>{lastOrder && lastOrder?.productId}</p> */}
              <p>
                <div className="mt-2">
                  {lastOrder?.productId.map((productId) => (
                    <ProductDetail key={productId} productId={productId} />
                  ))}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paynow;
