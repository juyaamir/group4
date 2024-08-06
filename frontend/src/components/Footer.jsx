import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-neutral text-neutral-content p-8 justify-around ">
        <aside className="flex items-center ">
          <img src={logo} alt="logo" className="h-12 w-12 rounded-full mt-3" />
          <h1 className="text-3xl text-yellow-500 font-DM1 mt-3">JourneyPack</h1>
        </aside>
        <nav className="py-1">
          <h6 className="footer-title">Follow Us</h6>
          <div className="grid grid-flow-col gap-4 text-blue-400 text-2xl">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="link link-hover hover:text-blue-500">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="link link-hover hover:text-blue-500">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="link link-hover hover:text-blue-500">
              <i className="fa-brands fa-square-twitter"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="link link-hover hover:text-blue-500">
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