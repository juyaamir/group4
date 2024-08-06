import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    toast.success("Subscribed to newsletter successfully!");
  };

  return (
    <>
      <footer className="footer bg-neutral text-neutral-content justify-around ">
        <aside className="flex items-center py-6 ">
          <img src={logo} alt="logo" className="h-12 w-12 rounded-full mt-3" />
          <h1 className="text-3xl text-yellow-600 font-DM1 mt-3">JourneyPack</h1>
        </aside>

        {/* Subscribe section */}
        <div className="flex flex-col py-6">
            <p className="font-bold">Newsletter Subscription</p>
          
          
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="email"
              placeholder="Subscribe to our newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-8 text-black w-50 pl-2 pr-8 text-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="h-8 w-50 bg-yellow-600 px-3 text-center text-white hover:bg-yellow-700"
            >
              Subscribe
            </button>
          </form>
        </div>

        <nav className=" flex flex-col py-6">
        <p className="font-bold">Get In Touch</p>
          <div className="grid grid-flow-col gap-2 text-blue-300 text-2xl">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-blue-500 hover:text-blue-700"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-red-400 hover:text-orange-600"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-blue-300 hover:text-blue-500"
            >
              <i className="fa-brands fa-square-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-blue-400 hover:text-blue-600"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-blue-400 hover:text-blue-600"
            >
              <i className="fa-brands fa-youtube text-red-500 hover:text-red-700 text-2xl"></i>
            </a>
          </div>
        </nav>
      </footer>

      <div className="bg-gray-900 text-white text-[14px] py-4 text-center">
        <p className="">
          &copy; {new Date().getFullYear()} JourneyPack All rights reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
