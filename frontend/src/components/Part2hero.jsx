import image1 from "../assets/03_01.png";
import image2 from "../assets/02_02.png";
import image3 from "../assets/04_01.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Card = ({ description, imageSrc, alt, link }) => {
  return (
    <Link
      to={link}
      className="card bg-base-100 image-full w-98 shadow-xl hover:scale-105 transition-transform duration-300"
    >
      <figure>
        <img src={imageSrc} alt={alt} />
      </figure>
      <div className="card-body text-center">
        <p>{description}</p>
      </div>
    </Link>
  );
};

const Part2hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    toast.success("Subscribed to newsletter successfully!");
  };

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:gap-24">
          <Card
            description="Visit our store for all your travel needs"
            imageSrc={image1}
            alt="Products"
            link="/product"
          />
          <Card
            description="We help you create your travel list with recommended Products"
            imageSrc={image2}
            alt="JourneyPack"
            link="/plan-your-vacation"
          />
          <Card
            description="Buy trending products at best prices"
            imageSrc={image3}
            alt="Sale"
            link="/sale"
          />
        </div>
        <div className="bg-white p-6 rounded-lg mt-8">
          <h2 className="font-OpenSans text-xl font-semibold italic tracking-widest text-[#54524f] text-center my-3">
            Subscribe to our Newsletter
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              required
            />
            <button
              type="submit"
              className="h-10 w-50 rounded-full bg-[#776c64] px-4 py-2 text-center font-OpenSans text-xl font-extrabold text-white opacity-90 focus:border-2 focus:border-white focus:outline-none mt-4"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Part2hero;
