import React from "react";
import image from "../assets/heroimage2.jpg";
import map from "../assets/map.jpg";
import paragleiding from "../assets/paragleiding.jpg";
import list from "../assets/list.jpg";
import shopping from "../assets/shopping.jpg";

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
