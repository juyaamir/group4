import  { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Image, Button, notification } from "antd";
import { MdAddShoppingCart } from "react-icons/md";
import Heart from "react-heart";
import logo from "../assets/logo.png";
import UpdateProduct from "./UpdataProduct";

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
  const [productItem, setProductItem] = useState([]);
  const [activeStates, setActiveStates] = useState({});

  const isUserAdmin = localStorage.getItem("isAdmin");

  const openNotification = (placement) => {
    api.info({
      message: "",
      description: "Item added successfully.",
      placement,
    });
  };

  const toggleHeart = (productId) => {
    setActiveStates((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
    setFavArray((current) => [...current, productId]);
  };

  const handleClick = useCallback((productId, price) => (event) => {
    setProductArray((current) => [...current, productId]);
    openNotification("top");
    setProductCount((prevCount) => prevCount + 1);
  }, [setProductArray, setProductCount]);

  const handleClick2 = (item) => {
    axios.delete(`http://localhost:8000/api/v1/product/${item}`);
  };

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

  return (
    <>
      {contextHolder}
      <div className="flex flex-row flex-wrap gap-2 rounded-md">
        {productItem?.map((item) => (
          <div
            key={item._id}
            className="card bg-base-200 w-60 shadow-xl rounded-md"
          >
            <div className="card-body text-center">
              <figure className="relative max-w-full">
                <Link to={`/image-description/${item._id}`}>
                  <Image
                    width={200}
                    height={220}
                    src={item.image}
                    alt={item.productname}
                  />
                </Link>
                <div className="">
                  <div style={{ width: "1rem" }}>
                    <Heart
                      className="w-4 absolute top-2 right-2"
                      isActive={activeStates[item._id] || false}
                      onClick={() => toggleHeart(item._id)}
                      animationScale={1.2}
                      activeColor="red"
                      inactiveColor="black"
                      animationDuration={0.9}
                    />
                  </div>
                </div>
                <img
                  src={logo}
                  alt="logo"
                  className="h-10 absolute w-10 rounded-full bottom4"
                />
              </figure>
              <h2 className="card-title text-lg">{item.productname}</h2>
              <p>
                <div className="text-sm">Price :&nbsp; {item.price}&nbsp;€</div>
              </p>
              <Button
                className="absolute text-lg border-none"
                onClick={handleClick(item._id, item.price)}
              >
                <MdAddShoppingCart />
              </Button>
            </div>
            <div>
              {isUserAdmin === "true" ? (
                <div className="flex justify-between border-2">
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
