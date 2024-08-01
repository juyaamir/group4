import { useState, useEffect } from "react";
import axios from "axios";

import { Avatar } from "antd";
import { Space, Typography } from "antd";

const { Text, Link } = Typography;

const Cart = ({
  productArray,
  setProductArray,
  productPrice,
  setProductPrice,
}) => {
  const [user, setUser] = useState(null);
  let id = localStorage.getItem("userId");
  const [error, setError] = useState(null);

  let payload = {
    userid: id,
    price: productPrice,
    productname: [productArray],
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/usersaccounts/${id}`)
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error(err);
        setError("Error fetching user data");
      });
  }, [id]);

  const postproduct = (e) => {
    // e.preventDefault();
    // axios.post(`http://localhost:8000/api/v1/product/${newitem}`);
    axios
      .post("http://localhost:8000/api/v1/order", payload)
      .then((response) => {
        console.log("Response:", response.data);
        setPurchase(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  /*  useEffect(() => {
    setNewOrder({ ...newitem, productid: "hello" });
  }, [productArray]); */

  return (
    <>
      {/*  <div>
        <h1>List of products</h1>
        {productArray?.map((item) => (
          <ol type="1">
            <li>{item}</li>
          </ol>
        ))}
        <div>
          Total Price:<strong>{productPrice}</strong>
        </div>
      </div> */}

      <div className="overflow-x-auto mx-20 border border-2 rounded-md p-4 my-4">
        <div className="p-14 flex flex-row gap-6">
          <Avatar size={40}>{user?.firstname}</Avatar>
          <Text type="success">
            {user?.firstname} &nbsp;&nbsp;
            {user?.lastname}
          </Text>
        </div>
        <table className="table">
          {/* head */}

          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {productArray?.map((item, key = 1) => (
              <tr>
                <th>{key}</th>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="max-w-full text-end px-16 py-2">
          Total Price:<strong>&nbsp;{productPrice}</strong>
        </div>
        <div className="max-w-full text-end px-16 py-2 ">
          <button className="btn btn-outline btn-success" onClick={postproduct}>
            Pay Now
          </button>
        </div>
      </div>
      {/*  <div> Products from Cart{productArray?.map((item) => item)}</div>; */}
    </>
  );
};

export default Cart;
