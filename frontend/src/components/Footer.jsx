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
      <footer className="footer bg-neutral text-neutral-content p-1 justify-around ">
        <aside className="flex items-center ">
          <img src={logo} alt="logo" className="h-12 w-12 rounded-full mt-3" />
          <h1 className="text-xl font-bold mt-3">JourneyPack</h1>
        </aside>

        {/* Subscribe section */}
        <div className="p-1 rounded-lg mx-auto">
          <h2 className="font-OpenSans text-xl font-semibold italic tracking-widest text-white text-center py-3">
            Subscribe to our Newsletter
          </h2>
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full max-w-xs mr-2"
              required
            />
            <button
              type="submit"
              className="h-10 w-50 rounded-full bg-blue-400 px-4 py-2 text-center font-OpenSans text-xl text-white hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>

        <nav className="py-1">
          <h6 className="footer-title">Follow Us</h6>
          <div className="grid grid-flow-col gap-4 text-blue-300 text-2xl">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover hover:text-blue-500"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover hover:text-blue-500"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover hover:text-blue-500"
            >
              <i className="fa-brands fa-square-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover hover:text-blue-500"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </nav>
      </footer>

      <div className="bg-gray-900 text-white text-[14px] py-4 text-center">
        <p className="">
          &copy; {new Date().getFullYear()} JourneyPack. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
