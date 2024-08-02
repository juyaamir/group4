import { useState, useEffect } from "react";
import axios from "axios";

import { Avatar } from "antd";
import { Space, Typography, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;

const Cart = ({ productArray, productPrice }) => {
  const [user, setUser] = useState(null);
  let id = localStorage.getItem("userId");
  const [error, setError] = useState(null);
  const [payload, setPayload] = useState(null);
  const [productDesc, setProductDesc] = useState(null);

  const deleteProduct = (PId) => {
    console.log(PId);
    productArray.splice(PId - 1, 1);
    productPrice;
    console.log(productArray);
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

  useEffect(() => {
    setPayload({
      userid: id,
      price: productPrice,
      productId: productArray,
    });
  }, [deleteProduct]);

  const postproduct = (e) => {
    // e.preventDefault();
    // axios.post(`http://localhost:8000/api/v1/product/${newitem}`);
    axios
      .post("http://localhost:8000/api/v1/order", payload)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  /*  useEffect(() => {
    setNewOrder({ ...newitem, productid: "hello" });
    }, [productArray]); */

  // const message = { name: "john" };

  useEffect(() => {
    axios
      .post(`http://localhost:8000/api/v1/product`, { productArray })
      // .then((response) => setUser(response.data))
      .then((response) => setProductDesc(response.data))

      .catch((err) => {
        console.error(err);
      });
  }, []);

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
            {productDesc?.map((item, key) => (
              <tr>
                <th></th>
                <td>
                  <strong>{item.productname}</strong>
                </td>
                <td>
                  <strong>{item.price}&nbsp; €</strong>
                </td>
                <td>
                  <img src={item.image} height="50" width="50" />
                </td>
                <td>
                  <Button
                    type="dashed"
                    danger
                    onClick={() => {
                      deleteProduct(item);
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="max-w-full text-end px-16 py-2">
          Total Price:<strong>&nbsp;{productPrice}</strong>
        </div>
        <div className="max-w-full text-end px-16 py-2 ">
          <button
            className="btn btn-outline btn-success"
            onClick={() => {
              postproduct();
            }}
          >
            Pay Now
          </button>
        </div>
      </div>
      {/*  <div> Products from Cart{productArray?.map((item) => item)}</div>; */}
    </>
  );
};

export default Cart;
