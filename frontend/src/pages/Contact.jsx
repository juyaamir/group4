import React, { useState } from "react";
import logo from "../assets/packing.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMobileScreenButton, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const [feedback, setFeedback] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback(true);
    //alert('Thank you for contacting us. We will get back to you shortly.');
  }

  return (
    <>
      {
        !feedback ? (
          <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${logo})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col justify-center items-center h-full p-4 md:p-8 lg:p-12">
              <h1 className="text-3xl font-bold pb-8 text-center text-white">Contact Us</h1>
              <form className="text-white p-8 rounded-md shadow-md w-full max-w-md space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-1">Name</label>
                  <input type="text" id="name" className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-0 text-black" />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">Email</label>
                  <input type="email" id="email" className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-0 text-black" />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1">Message</label>
                  <textarea id="message" className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-0 text-black" cols="30" rows="5"></textarea>
                </div>
                <button type="submit" className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                  Submit
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-md shadow-md">
              <h1 className="text-2xl font-bold text-center">Thank you for contacting us!</h1>
              <p className="text-center">We will get back to you shortly.</p>
              <button onClick={() => setFeedback(false)} className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Close</button>
            </div>
          </div>
        )
      }

      <div className="flex flex-col md:flex-row justify-center text-slate-600 py-4 my-12 text-center space-y-8 md:space-y-0 md:space-x-20">
        <div className="flex flex-col items-center px-4 md:px-20">
          <FontAwesomeIcon icon={faLocationDot} size="2x" />
          <h1 className="text-xl font-bold text-center mt-2">Address</h1>
          <p>Weißkopfstraße 123 <br />65432 Berlin</p>
        </div>
        <div className="flex flex-col items-center px-4 md:px-20">
          <FontAwesomeIcon icon={faMobileScreenButton} size="2x" />
          <h1 className="text-xl font-bold text-center mt-2">Call Us</h1>
          <p>+49123456789</p>
        </div>
        <div className="flex flex-col items-center px-4 md:px-20">
          <FontAwesomeIcon icon={faEnvelopeOpenText} size="2x" />
          <h1 className="text-xl font-bold text-center mt-2">Email Us</h1>
          <p>journeypack@gmail.com</p>
        </div>
      </div>
    </>
  );
};

export default Contact;