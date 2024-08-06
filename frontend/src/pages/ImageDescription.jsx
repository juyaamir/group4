import React from "react";
import { Button, Card, Flex, Typography } from "antd";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdAddShoppingCart } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const ImageDescription = ({
  productArray,
  setProductCount,
  setProductArray,
  productPrice,
  setProductPrice,
}) => {
  const { id } = useParams();
  const [imgId, setImgId] = useState(null);
  const [error, setError] = useState(null);
  const [size, setSize] = useState({});

  const cardStyle = {
    width: 620,
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

  const handleChange1 = (e) => {
    setSize((e.target.name = e.target.value));
    setlocalStorage.setItem("size", size);
  };
  // console.log(size);

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
        <Link
          to="/product"
          className="absolute bg-base-200 text-2xl ml-4 mt-2 "
        >
          <IoMdArrowRoundBack />
        </Link>
        <Flex justify="space-between ">
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
                <div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3>Manufacturer</h3>
                      <p className="text-sm">
                        <img
                          src={logo}
                          alt="logo"
                          className="h-10 w-10 rounded-full"
                        />

                        <div>
                          <h3>Product Description </h3>
                          {imgId?.brand && imgId?.brand ? (
                            <p className="text-sm">{imgId?.brand}</p>
                          ) : (
                            <p className="text-sm">JourneyPack</p>
                          )}
                        </div>
                      </p>
                    </div>
                    <div>
                      <h3>Product Description </h3>
                      {imgId?.imageDescription && imgId?.imageDescription ? (
                        <p className="text-sm">{imgId?.imageDescription}</p>
                      ) : (
                        <p className="text-sm">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Dolore, qui delectus voluptas esse reprehenderit
                          laboriosam quos odio enim, perferendis, in veniam
                          facere eligendi! Excepturi illo id, quaerat amet
                          pariatur saepe.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-4 my-2">
                  <select
                    name="size"
                    id="size"
                    onChange={handleChange1}
                    className="select select-bordered select-xs w-full max-w-xs"
                  >
                    <option value="#">Select Size</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="Extra-Large">Extra-Large</option>
                  </select>
                </div>
                {/* <table className="table">
                 
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Manufacturer</th>
                      <th>Categorey</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    <tr>
                      <td>Wool</td>
                      <td>Adidas</td>
                      <td>{imgId?.category}</td>
                    </tr>
                  </tbody>
                </table> */}
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
