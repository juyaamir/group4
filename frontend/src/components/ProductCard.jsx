import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
//import AddNewProduct from "./AddNewProduct";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import UpdateProduct from "./UpdataProduct";
import Newimage from "./Newimage";
import { use } from "marked";
import { Card } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ProductCard = ({
  category,
  productCount,
  setProductCount,
  productArray,
  setProductArray,
  productPrice,
  setProductPrice,
  setFavArray,
}) => {
  const [productItem, setProductItem] = useState([]);

  //const [productArray, setProductArray] = useState([]);
  //console.log(c["category"]);
  //console.log(productARR);
  /*  let category = c["category"]; */
  let isUserAdmin = localStorage.getItem("isAdmin");
  // console.log(isUserAdmin);
  /*  const newdata = {
    productname: productname,
    price: price,
    category: category,
  }; */
  /*  let isUserAdmin = "true"; */
  const addfav = (item) => {
    setFavArray((current) => [...current, item]);
    console.log(favArray);
  };

  const handleClick = (productname, price) => (event) => {
    setProductCount(productCount + 1);
    setProductArray((current) => [...current, productname]);

    setProductPrice(productPrice + price);
  };

  ///DELETE Product//
  const handleClick2 = (item) => {
    axios.delete(`http://localhost:8000/api/v1/product/${item}`);
  };

  ///EDIT Product//
  /*  const handleClick3 = (item) => {
    axios.put(`http://localhost:8000/api/v1/product/${item}`);
  }; */

  //get items//7

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/product?category=${category}`
        );
        setProductItem(response.data);
      } catch (error) {
        console.error(`Error in fetching Product data: ${error}`);
      }
    };

    fetchProductData();
  }, [category, handleClick2]);

  /*   const getitems = () => {
    axios
      .get(`http://localhost:8000/api/v1/product?category=${category}`)
      .then((response) => {
        setProductItem(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
  feature/contact-page
    // getitems();
    console.log("I am a useeffect");
  }, [handleClick2]);

    getitems();
  }, [handleClick2]); */

  // console.log(productItem.map((item) => item.image));
  /*   console.log(productItem.map((item) => item._id));
  console.log(productItem.map((item) => item.productname));
  console.log(productItem.map((item) => item.price));
  console.log(productItem.map((item) => item.category));

  const itemcategory = productItem.map((item) => item.category); */

  return (
    <div className="flex flex-row flex-wrap gap-4  rounded-md p-1 ">
      {productItem?.map((item, key) => (
        <div key={item._id} className="card bg-base-200 w-64 shadow-xl">
          <p className="m-4 text-end">
            <button
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
              onClick={() => addfav(item.productname)}
            >
              <HeartOutlined />
            </button>
          </p>
          <figure className="px-10">
            <img
              src={item.image}
              alt={item.productname}
              className="rounded-xl"
            />
          </figure>

          <div className="card-body items-center text-center">
            <h2 className="card-title">{item.productname}</h2>
            <p>
              <strong>Price :&nbsp; {item.price}&nbsp;€</strong>
            </p>
            <div className="card-actions">
              <button
                className="btn btn-primary  btn-sm"
                onClick={handleClick(item.productname, item.price)}
              >
                Move to Cart
              </button>
            </div>
          </div>
          <div>
            {isUserAdmin === "true" ? (
              <div className="flex justify-between">
                <div className="collapse max-w-full">
                  <input type="checkbox" />
                  <div className="collapse-title text-md font-small">
                    <Button type="dashed" icon={<EditOutlined />}></Button>
                  </div>
                  <div className="collapse-content">
                    <p>
                      <UpdateProduct itemid={item._id} ct={category} />
                    </p>
                  </div>
                </div>

                <div>
                  <Button
                    className="mt-4 mr-3 max-w-full"
                    type="dashed"
                    icon={<DeleteOutlined />}
                    onClick={() => handleClick2(item._id)}
                  ></Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}

      {/*  <div className="flex flex-row flex-wrap gap-4">
        {productItem?.map((item, key) => (
          <div
            key={item._id}
            className="card card-compact bg-base-100 w-80 shadow-xl"
          >
            <figure>
              <img src={item.image} alt={item.productname} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.productname}</h2>
              <p>Price :&nbsp;{item.price} &nbsp;Euro </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={handleClick(item.productname, item.price)}
                >
                  Move to Cart
                </button>
              </div>
              {isUserAdmin === "true" ? (
                <div className="flex justify-between">
                  <div className="collapse max-w-full">
                    <input type="checkbox" />
                    <div className="collapse-title text-md font-small">
                      <Button type="dashed" icon={<EditOutlined />}></Button>
                    </div>
                    <div className="collapse-content">
                      <p>
                        <UpdateProduct itemid={item._id} ct={category} />
                      </p>
                    </div>
                  </div>

                  <div>
                    <Button
                      className="mt-4 mr-3 max-w-full"
                      type="dashed"
                      icon={<DeleteOutlined />}
                      onClick={() => handleClick2(item._id)}
                    ></Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ProductCard;
