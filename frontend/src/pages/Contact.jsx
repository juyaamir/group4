import React from "react";
import logo from "../assets/logo.png"; // Correctly import the image

const Contact = () => {
  return (
    <div className="flex m-32 p-12 justify-around">
      <div>
        <img src={logo} alt="logo" className="w-full h-auto" /> {/* Responsive Image */}
        <p className="mt-8">Weißkopf Straße 00 <br />65432 Berlin <br />Tel: 0123456789</p>
      </div>
      <div>
        <h1 className="text-3xl font-bold pb-8">Contact Us</h1>
        <form>
          <div className="pb-4">
            <label htmlFor="name" className="block mb-1">Name</label>
            <input type="text" id="name" className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-none focus:ring-0" />
          </div>
          <div className="pb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input type="email" id="email" className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-none focus:ring-0" />
          </div>
          <div className="pb-4">
            <label htmlFor="message" className="block mb-1">Message</label>
            <textarea id="message" className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-none focus:ring-0" cols="30" rows="5"></textarea>
          </div>
          <button type="submit" className=" w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
