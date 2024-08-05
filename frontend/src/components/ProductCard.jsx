import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import AddNewProduct from "./AddNewProduct";
import { DeleteOutlined } from "@ant-design/icons";

import { EditOutlined } from "@ant-design/icons";
import UpdateProduct from "./UpdataProduct";

import Heart from "react-heart";
import { Card } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { MdAddShoppingCart } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { Button, Divider, notification, Space } from "antd";
import { BorderBottomOutlined, BorderTopOutlined } from "@ant-design/icons";

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
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: ``,
      description: "Item is added successfully.",
      placement,
    });
  };
  const [productItem, setProductItem] = useState([]);
  const [active, setActive] = useState(false);

  /*   let length = productArray.length; */

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

  const addfav = (productid) => {
    setFavArray((current) => [...current, productid]);
    openNotification("top");
    // console.log(setFavArray);
    setActive(!active);
    //console.log(active);
  };

  const handleClick = (productId, price) => (event) => {
    /*  console.log(productId); */
    setProductArray((current) => [...current, productId]);
    openNotification("top");
    let length = productArray.length + 1;
    setProductCount(length);
    console.log(length);
    /*  setProductPrice((cur) => [...cur, price]);
    console.log(setProductPrice); */
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
    <>
      {contextHolder}

      <div className="flex flex-row flex-wrap gap-6 rounded-md p-1 ">
        {productItem?.map((item, key) => (
          <div
            key={item._id}
            className="card bg-base-200 w-52 shadow-xl rounded-md"
          >
            <div className="card-body  text-center">
              <figure className="px-8 relative max-w-full ">
                <Link to={`/image-description/${item._id}`}>
                  <Image width={200} src={item.image} alt={item.productname} />
                </Link>
                <div className="absolute top-0 right-0 mr-4">
                  <div style={{ width: "1rem" }}>
                    {/*    <Heart
                      className=""
                      isActive={active}
                      onClick={() => addfav(item._id)}
                      animationTrigger="both"
                      inactiveColor="black"
                      activeColor="red"
                      animationDuration={0.1}
                    /> */}
                    <Space>
                      <Button
                        type="dashed"
                        icon={<HeartOutlined />}
                        onClick={() => addfav(item._id)}
                      ></Button>
                    </Space>
                  </div>
                  {/*     <button
                  className="text-2xl text-black-300"
                  onClick={() => addfav(item.productname)}
                >
                  <CiHeart />
                </button> */}
                </div>
                {/*   <div className="absolute bottom-0 right-0 m-2">
                <button
                  className=" text-xl text-blue-300 mr-0 mb-0"
                  onClick={handleClick(item._id, item.price)}
                >
                  <MdAddShoppingCart />
                </button>
              </div> */}
              </figure>
              <h2 className="card-title text-xl">{item.productname}</h2>
              <p>
                <div className="text-md">Price :&nbsp; {item.price}&nbsp;€</div>
              </p>
              <div className="bottom-4 right-0">
                <button
                  className="btn glass  text-2xl text-black-300 "
                  onClick={handleClick(item._id, item.price)}
                >
                  <MdAddShoppingCart />
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
      </div>
    </>
  );
};

export default ProductCard;
