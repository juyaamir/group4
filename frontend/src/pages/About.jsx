import React from "react";
import packing from "../assets/packing.jpg";
import map from "../assets/map.jpg";
import hiking from "../assets/hiking.jpg";
import list from "../assets/list.jpg";
import shopping from "../assets/shopping.jpg";
import kondol from "../assets/kondol-lake.jpg";
import camera from "../assets/camera.jpg"

const About = () => {
  return <div className="text-grey">

<div className="hero bg-base-200 mb-24">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src={packing}
      className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold pb-12 text-orange-400">Welcome to  JourneyPack</h1>
      <h1 className="text-3xl font-bold italic text-orange-400">Your Ultimate Travel Companion!</h1>
      <p className="py-6">
      Planning a trip can be both exciting and overwhelming. At JourneyPack, we simplify your travel preparations by helping you pack smartly for any destination, based on weather conditions and your planned activities. Our comprehensive guide ensures you have everything you need for a perfect getaway, and you can conveniently purchase all your essentials from our e-commerce store.
      </p>
      {/* <button className="btn btn-primary">Get Started</button> */}
    </div>
  </div>
</div>


  
<div className="text-grey px-32">
  
  <div className="mb-8">
    <h2 className="text-2xl font-bold">Why Choose JourneyPack?</h2><br />
    
    <p><b className="text-l">Personalized Packing Lists</b>: Get custom packing recommendations tailored to your destinations weather and your planned activities. Whether you are heading to a sunny beach, a snowy mountain, or a bustling city, we've got you covered.</p>
     <br />
    <p><b>Weather-Based Suggestions:</b> Our smart system analyzes the weather forecast at your destination and suggests appropriate clothing, gear, and accessories to keep you comfortable and prepared. </p>
     <br />
    <p><b>Activity-Specific Gear:</b> From hiking boots and snorkeling gear to city walking shoes and formal wear, we recommend items based on your itinerary to ensure you're ready for every adventure. </p>
    <br />
    <p><b>Shop with Ease:</b> Find all your travel essentials in one place. Our e-commerce platform offers a wide range of high-quality products from trusted brands, making it easy for you to purchase everything you need for your trip.</p>
     <br /><br />
  </div>




   <h2 className="text-2xl font-bold">How It Works </h2><br />

   <div className="flex flex-wrap gap-4 mb-24">
     <div class="card bg-base-100 w-96 shadow-xl">
       <figure>
      <img
        src={map}
        alt="destinaion map" />
       </figure>
       <div class="card-body">
      <h2 class="card-title">1. Select Your Destination!</h2>
      <p>Enter your travel destination and dates to receive up-to-date weather forecasts and tailored packing advice.</p>
      <div class="card-actions justify-end">
       
      </div>
       </div>
     </div>
     
     
     <div class="card bg-base-100 w-96 shadow-xl">
       <figure>
      <img
        src={hiking}
        alt="activity pic" />
       </figure>
       <div class="card-body">
      <h2 class="card-title">2. Choose Your Activities</h2>
      <p>Specify the activities you plan to do, such as hiking, swimming, dining out, or sightseeing.</p>
      <div class="card-actions justify-end">
       
      </div>
       </div>
     </div>
     
     
     
     
     <div class="card bg-base-100 w-96 shadow-xl">
       <figure>
      <img
        src={list}
        alt="list pic" />
       </figure>
       <div class="card-body">
      <h2 class="card-title">3. Get Your AI Generated Packing List</h2>
      <p>Receive a customized packing list with all the essentials you will need for your trip, based on the weather and your activities.</p>
      <div class="card-actions justify-end">
        
      </div>
       </div>
     </div>
      
     <div class="card bg-base-100 w-96 shadow-xl">
       <figure>
      <img
        src={shopping}
        alt="shopping pic" />
       </figure>
       <div class="card-body">
      <h2 class="card-title">4. Go For Shop</h2>
      <p>Browse and purchase recommended items directly from our website. Enjoy the convenience of having all your travel gear delivered to your doorstep.</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Shop Now</button>
      </div>
       </div>
     </div>
   </div>

  
  
  
  <h2 className="text-2xl font-bold">Explore Our Collections</h2><br />

  <div className="flex gap-4 mb-24">
    <div class="card bg-base-100 image-full w-96 shadow-xl">
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">Weather-Ready Apparel</h2>
      <p>Stay comfortable and stylish with our range of weather-appropriate clothing.</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
    </div>
    
    
    
    
    
    
    <div class="card bg-base-100 image-full w-96 shadow-xl">
    <figure>
      <img
        src={kondol}
        alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">Adventure Gear</h2>
      <p>Equip yourself with top-notch gear for outdoor activities and adventures.</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
    </div>
    
    
    <div class="card bg-base-100 image-full w-96 shadow-xl">
    <figure>
      <img
        src={camera}
        alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">Travel Accessories</h2>
      <p>Discover must-have travel accessories, from luggage and travel pillows to travel-sized toiletries and gadgets.</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
    </div>
  </div>

  
  
  <h2 className="text-2xl font-bold">Travel Smart, Pack Smart</h2><br />
  
  <div className="mb-24">
    <p>Don’t let packing stress you out. With JourneyPack, you can focus on the excitement of your journey while we take care of the details. Trust us to provide the best recommendations and products, so you're always prepared, no matter where your travels take you.</p><br />
    
    <p>Start your packing journey with JourneyPack today and enjoy a seamless travel experience from start to finish!</p><br />
    
    <p>Ready to Pack? Let's Get Started!</p>
    
    Visit <a href="https://http://www.journeypack.com" className="text-blue-500"><i>JourneyPack</i></a> and explore the ultimate way to prepare for your next adventure. Happy travels!</div>
  </div>

  </div>

import image from "../assets/heroimage2.jpg";

const About = () => {
  return (
    <div className="relative">
      {/* Banner Image */}
      <img
        src={image}
        alt="JourneyPack - Travel Companion"
        className="h-64 w-full object-cover absolute top-0 left-0 z-0" // Adjust styles as needed
      />

      <div className="container mx-auto px-4 py-16 text-white relative z-10">
        <h2 className="text-3xl font-bold">
          Welcome to JourneyPack: Your Ultimate Travel Companion!
        </h2>
        <br />
        <p>
          {" "}
          Planning a trip can be both exciting and overwhelming. At JourneyPack,
          we simplify your travel preparations by helping you pack smartly for
          any destination, based on weather conditions and your planned
          activities. Our comprehensive guide ensures you have everything you
          need for a perfect getaway, and you can conveniently purchase all your
          essentials from our e-commerce store.
        </p>
      </div>
      <div className="text-grey p-32">
        <br />
        <h2 className="text-2xl font-bold">Why Choose JourneyPack?</h2>
        <br />
        <p>
          <b className="text-l">Personalized Packing Lists</b>: Get custom
          packing recommendations tailored to your destinations weather and your
          planned activities. Whether you are heading to a sunny beach, a snowy
          mountain, or a bustling city, we've got you covered.
        </p>
        <br />
        <p>
          <b>Weather-Based Suggestions:</b> Our smart system analyzes the
          weather forecast at your destination and suggests appropriate
          clothing, gear, and accessories to keep you comfortable and prepared.{" "}
        </p>
        <br />
        <p>
          <b>Activity-Specific Gear:</b> From hiking boots and snorkeling gear
          to city walking shoes and formal wear, we recommend items based on
          your itinerary to ensure you're ready for every adventure.{" "}
        </p>
        <br />
        <p>
          <b>Shop with Ease:</b> Find all your travel essentials in one place.
          Our e-commerce platform offers a wide range of high-quality products
          from trusted brands, making it easy for you to purchase everything you
          need for your trip.
        </p>
        <br />
        <br />
        <h2 className="text-2xl font-bold">How It Works </h2>
        <br />
        <p>
          <b>1. Select Your Destination:</b> Enter your travel destination and
          dates to receive up-to-date weather forecasts and tailored packing
          advice.
        </p>
        <br />
        <p>
          <b>2. Choose Your Activities:</b> Specify the activities you plan to
          do, such as hiking, swimming, dining out, or sightseeing.
        </p>
        <br />
        <p>
          <b>3. Get Your Packing List:</b> Receive a customized packing list
          with all the essentials you will need for your trip, based on the
          weather and your activities.
        </p>
        <br />
        <p>
          <b>4. Shop Now:</b> Browse and purchase recommended items directly
          from our website. Enjoy the convenience of having all your travel gear
          delivered to your doorstep.
        </p>
        <br />
        <br />
        <h2 className="text-2xl font-bold">Explore Our Collections</h2>
        <br />
        <p>
          <b>Weather-Ready Apparel:</b> Stay comfortable and stylish with our
          range of weather-appropriate clothing.
        </p>
        <p>
          <b>Adventure Gear:</b> Equip yourself with top-notch gear for outdoor
          activities and adventures.
        </p>
        <p>
          <b>Travel Accessories:</b> Discover must-have travel accessories, from
          luggage and travel pillows to travel-sized toiletries and gadgets.
        </p>
        <br />
        <br />
        <h2 className="text-2xl font-bold">Travel Smart, Pack Smart</h2>
        <br />
        <p>
          Don’t let packing stress you out. With JourneyPack, you can focus on
          the excitement of your journey while we take care of the details.
          Trust us to provide the best recommendations and products, so you're
          always prepared, no matter where your travels take you.
        </p>
        <br />
        <p>
          Start your packing journey with JourneyPack today and enjoy a seamless
          travel experience from start to finish!
        </p>
        <br />
        <p>Ready to Pack? Let's Get Started!</p>
        Visit{" "}
        <a href="https://http://www.journeypack.com">
          <i>JourneyPack</i>
        </a>{" "}
        and explore the ultimate way to prepare for your next adventure. Happy
        travels!
      </div>
    </div>
  );

};

export default About;
