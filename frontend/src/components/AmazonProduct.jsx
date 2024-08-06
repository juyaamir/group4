import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { client } from "./client";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { RotatingLines } from "react-loader-spinner";
import Heart from "react-heart";
import { NavLink } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import logo from "../assets/logo.png";
import { IoArrowBackSharp } from "react-icons/io5";

const AmazonProduct = ({ favitem }) => {
  console.log(favitem);
  const [product, setProduct] = useState(null);
  /*  const [productId, setProductId] = useState(favitem); */
  /*  const { productId } = item; */

  const getMobileById = async (productId) => {
    try {
      const entry = await client.getEntry(productId);
      return entry;
    } catch (error) {
      console.log("Error fetching the Entry", error);
    }
  };

  useEffect(() => {
    const getMobile = async () => {
      const entry = await getMobileById(favitem);
      setProduct(entry.fields);
    };
    getMobile();
  }, [favitem]);

  return (
    <div>
      {product &&
        product(
          <img
            src={product.image.fields.file.url}
            alt="product image"
            className=" hover:cursor-pointer"
          />
        )}
      {item}
    </div>
  );
};

export default AmazonProduct;
