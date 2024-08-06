import React from "react";
import { Button, Card, Flex, Typography } from "antd";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdAddShoppingCart } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

const ImageDescription = ({
  productArray,
  setProductCount,
  setProductArray,
  productPrice,
  setProductPrice,
}) => {
  const { id } = useParams();
  const [imgId, setImgId] = useState(null);
  const cardStyle = {
    width: 620,
  };
  const imgStyle = {
    display: "block",
    width: 273,
  };
  const handleClick = (productid) => (event) => {
    /*   setProductCount(productCount + 1); */
    setProductArray((current) => [...current, productid]);
    let length = productArray.length + 1;
    setProductCount(length);
    //console.log(length);

    /*  setProductPrice(productPrice + price); */
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/product/${id}`)
      .then((response) => setImgId(response.data))
      .catch((err) => {
        console.error(err);
        setError("Error fetching user data");
      });
  }, []);
  return (
    <div className="flex flex-wrap justify-center py-10 bg-base-300">
      <Card
        hoverable
        style={cardStyle}
        styles={{
          body: {
            padding: 0,
            overflow: "hidden",
          },
        }}
      >
        <Link to="/product" className="absolute bg-base-200 text-2xl ml-4 mt-2 ">
          <IoMdArrowRoundBack />
        </Link>
        <Flex justify="space-between " >
          <img alt="avatar" src={imgId?.image} style={imgStyle} />
          <Flex
            vertical
            align="flex-end"
            justify="space-between"
            style={{
              padding: 32,
            }}
          >
                <img
                  src={logo}
                  alt="logo"
                  className="h-10 absolute w-10 rounded-full bottom5"
                />
            <Typography.Title level={3}>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Manufacturer</th>
                      <th>Categorey</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <td>Wool</td>
                      <td>Adidas</td>
                      <td>{imgId?.category}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="rating text-center">
                  <p className="text-sm">Reviews&nbsp;&nbsp;</p>
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
              </div>
            </Typography.Title>
            <Button
              type="primary"
              target="_blank"
              className="btn btn-square btn-outline  text-blue-300 mr-0 mb-0 text-2xl "
              onClick={handleClick(imgId?._id)}
            >
              <MdAddShoppingCart />

              {/* <button onClick={handleClick(imgId?.productname, imgId?.price)}>
                Move to Cart
              </button> */}
            </Button>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default ImageDescription;
