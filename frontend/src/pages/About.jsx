import React from "react";
import packing from "../assets/packing.jpg";
import map from "../assets/map.jpg";
import hiking from "../assets/hiking.jpg";
import list from "../assets/list.jpg";
import shopping from "../assets/shopping.jpg";
import kondol from "../assets/kondol-lake.jpg";
import camera from "../assets/camera.jpg";
import snowgirl from "../assets/snowgirl.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="text-grey px-6 md:px-12 lg:px-24 ">
      <div className="hero bg-base-200 mb-12 md:mb-24 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={packing} className="max-w-sm rounded-lg shadow-2xl hover:cursor-pointer" />
          <div>
            <h1 className="text-3xl md:text-5xl font-bold pb-4 md:pb-6 text-[#deb37e]">Welcome to JourneyPack</h1>
            <h1 className="text-xl md:text-2xl font-bold italic pb-4 md:pb-6 text-gray-600">Your Ultimate Travel Companion!</h1>
            <p className="py-4 md:py-6">
              Planning a trip can be both exciting and overwhelming. At JourneyPack, we simplify your travel preparations by helping you pack smartly for any destination, based on weather conditions and your planned activities. Our comprehensive guide ensures you have everything you need for a perfect getaway, and you can conveniently purchase all your essentials from our e-commerce store.
            </p>
          </div>
        </div>
      </div>
      <div className="text-grey px-4 md:px-8">
        <div className="mb-12 md:mb-24">
          <h2 className="text-xl md:text-2xl font-bold pb-4 md:pb-6">Why Choose JourneyPack?</h2>

          <div className="collapse collapse-plus bg-base-200 mb-2 hover:cursor-pointer">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-lg md:text-xl font-medium">Personalized Packing Lists</div>
            <div className="collapse-content">
              <p>Get custom packing recommendations tailored to your destination's weather and your planned activities. Whether you are heading to a sunny beach, a snowy mountain, or a bustling city, we've got you covered.</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 mb-2 hover:cursor-pointer">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-lg md:text-xl font-medium">Weather-Based Suggestions</div>
            <div className="collapse-content">
              <p>Our smart system analyzes the weather forecast at your destination and suggests appropriate clothing, gear, and accessories to keep you comfortable and prepared.</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 mb-2 hover:cursor-pointer">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-lg md:text-xl font-medium">Activity-Specific Gear</div>
            <div className="collapse-content">
              <p>From hiking boots and snorkeling gear to city walking shoes and formal wear, we recommend items based on your itinerary to ensure you're ready for every adventure.</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 mb-2 hover:cursor-pointer">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-lg md:text-xl font-medium">Shop with Ease</div>
            <div className="collapse-content">
              <p>Find all your travel essentials in one place. Our e-commerce platform offers a wide range of high-quality products from trusted brands, making it easy for you to purchase everything you need for your trip.</p>
            </div>
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold pb-4 md:pb-6 hover:cursor-pointer">How It Works</h2>
        <ul className="steps steps-vertical md:steps-horizontal text-black pb-4 md:pb-8">
          <li className="step step-primary">Select your destination</li>
          <li className="step step-primary">Choose Your Activities</li>
          <li className="step">Get Your AI Generated Packing list</li>
          <li className="step">Go For Shop</li>
        </ul>
        <div className="flex flex-wrap gap-4 mb-12 md:mb-24 justify-center">
          <div className="card bg-base-100 w-full md:w-96 shadow-xl hover:scale-105 hover:cursor-pointer">
            <figure>
              <img src={map} alt="destination map" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">1. Select Your Destination!</h2>
              <p>Enter your travel destination and dates to receive up-to-date weather forecasts and tailored packing advice.</p>
            </div>
          </div>
          <div className="card bg-base-100 w-full md:w-96 shadow-xl hover:scale-105 hover:cursor-pointer">
            <figure>
              <img src={hiking} alt="activity pic" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">2. Choose Your Activities</h2>
              <p>Specify the activities you plan to do, such as hiking, swimming, dining out, or sightseeing.</p>
            </div>
          </div>
          <div className="card bg-base-100 w-full md:w-96 shadow-xl hover:scale-105 hover:cursor-pointer">
            <figure>
              <img src={list} alt="list pic" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">3. Get Your AI Generated Packing List</h2>
              <p>Receive a customized packing list with all the essentials you will need for your trip, based on the weather and your activities.</p>
            </div>
          </div>
          <div className="card bg-base-100 w-full md:w-96 shadow-xl hover:scale-105 hover:cursor-pointer">
            <figure>
              <img src={shopping} alt="shopping pic" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">4. Go For Shop</h2>
              <p>Browse and purchase recommended items directly from our website. Enjoy the convenience of having all your travel gear delivered to your doorstep.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary"><Link to="/product">Shop Now</Link></button>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold pb-4 md:pb-6">Explore Our Collections</h2>
        <div className="flex flex-wrap gap-4 mb-12 md:mb-24 justify-center">
          <div className="card bg-base-100 image-full w-full md:w-96 shadow-xl hover:scale-105 hover:cursor-pointer">
            <figure>
              <img src={snowgirl} alt="girl in snow" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Weather-Ready Apparel</h2>
              <p>Stay comfortable and stylish with our range of weather-appropriate clothing.</p>
            </div>
          </div>
          <div className="card bg-base-100 image-full w-full md:w-96 shadow-xl hover:scale-105 hover:cursor-pointer">
            <figure>
              <img src={kondol} alt="Kondol-lake pic" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Adventure Gear</h2>
              <p>Equip yourself with top-notch gear for outdoor activities and adventures.</p>
            </div>
          </div>
          <div className="card bg-base-100 image-full w-full md:w-96 shadow-xl hover:scale-105 hover:cursor-pointer">
            <figure>
              <img src={camera} alt="Camera pic" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Travel Accessories</h2>
              <p>Discover must-have travel accessories, from luggage and travel pillows to travel-sized toiletries and gadgets.</p>
            </div>
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold">Travel Smart, Pack Smart</h2><br />
        <div className="mb-12 md:mb-24">
          <p>Don’t let packing stress you out. With JourneyPack, you can focus on the excitement of your journey while we take care of the details. Trust us to provide the best recommendations and products, so you're always prepared, no matter where your travels take you.</p><br />
          <p>Start your packing journey with JourneyPack today and enjoy a seamless travel experience from start to finish!</p><br />
          <p>Ready to Pack? Let's Get Started!</p>
          Visit <Link to="/" className="text-yellow-600 font-bold italic">JourneyPack</Link> and explore the ultimate way to prepare for your next adventure. Happy travels!</div>
        </div>
  </div>
  );
};
export default About;


