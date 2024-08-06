import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { Alert } from "antd";
import Marquee from "react-fast-marquee";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { priceContext } from "../App";
import { useContext } from "react";
import axios from "axios";
import "../App.css";

import logo from "../assets/logo.png";

import ThemeToggle from "./Theme";

const Header = ({ islogged, productCount }) => {
  const [headimg, setHeadimg] = useState([]);
  // let userlogged = islogged["islogged"];
  /*  console.log(favArray + "header"); */
  let getuserId = localStorage.getItem("userId");
  const productPrice = useContext(priceContext);
  /*  console.log(getuserId); */
  useEffect(() => {
    const fetchuserimage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user-image/${getuserId}`
        );
        setHeadimg(response.data);
      } catch (error) {
        console.error(`Error in fetching Product data: ${error}`);
      }
    };

    fetchuserimage();
  }, []);
  /*   console.log(headimg[headimg.length - 1]); */

  const latestimghead = headimg && headimg[headimg.length - 1];
  //console.log(latestimghead);
  return (
    <>
      <div className="flex flex-wrap justify-around navbar bg-neutral text-neutral-content">
        <p>
          Free &nbsp;
          <span className="text-white">DELIVERY</span>
          &nbsp; over 60€
        </p>
        <p>
          <Link
            to={`/sale`}
            className=" bg-yellow-200  py-2 px-3 rounded-md animate-pulse text-black"
          >
            <span className="font-bold">
              <i className="fa-regular fa-star bg-yellow-400"></i> Special Offer{" "}
              <i className="fa-regular fa-star bg-yellow-400"></i>{" "}
            </span>{" "}
            Purchase today and get{" "}
            <span className="text-red-500 underline font-bold ">60%</span> off!
            {/*             <span className="relative flex h-3 w-3 bottom-8 left-full">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span> */}
          </Link>
        </p>
        <p> 30 Days Free Return</p>
        <ThemeToggle />
      </div>
      <div className="navbar bg-base-100 m-w-full">
        <div className="dropdown md:hidden lg:hidden ">
          {/* JourneyPack */}
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/about`}>About</Link>
            </li>

            <li>
              <Link to={`/product`}>Products</Link>
            </li>
            <li>
              <Link to={`/stores`}>Stores</Link>
            </li>
            <li>
              <Link to={`/plan-your-vacation`}>
                Ask from <strong>JourneyPack</strong>
              </Link>
            </li>
            <li>
              <Link to={`/contact-us`}>Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-start">
          {/* <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div> */}
          <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />

          <h4 className="text-3xl pl-2 text-yellow-600 font-DM1 ">
            JourneyPack
          </h4>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/about`}>About</Link>
            </li>
            <li>
              <Link to={`/product`}>Products</Link>
            </li>
            <li>
              <Link to={`/stores`}>Stores</Link>
            </li>
            <li className=" border-2 rounded-md animate-move-left-right mx-2">
              <Link to={`/plan-your-vacation`}>
                Need help what to pack? Ask from
                <strong>&nbsp;JourneyPack</strong>
              </Link>
            </li>
            <li>
              <Link to={`/contact-us`}>Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div>
            <Link to="/favourite-product">
              <HeartOutlined />
            </Link>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {productCount}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">
                    {productCount} Items
                  </span>
                  {/*  <span className="text-info m-2">
                    Total price: &nbsp;{productPrice} €
                  </span> */}
                  <div className="card-actions">
                    <Link to={`/cart`}>
                      <button className="btn btn-primary btn-block">
                        View cart
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {islogged ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {/*  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                  /> */}
                  {latestimghead ? (
                    <img src={latestimghead.image} height="100" width="100" />
                  ) : (
                    <div className="">
                      <Avatar icon={<UserOutlined />} />
                    </div>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <button className="btn btn-sm glass">
                    <Link to={`/profile/${getuserId}`}>Profile</Link>
                  </button>
                </li>

                <li>
                  <button className="btn btn-sm glass">
                    <Link to={`/signout`}>Sign out</Link>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <Link to={`/signin`}>
                <button className="btn btn-sm glass">Sign in</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
