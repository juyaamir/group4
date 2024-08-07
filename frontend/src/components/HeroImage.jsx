import { Link } from "react-router-dom";
import image from "../assets/01_hero.png";
//import image from "../assets/heroimage2.jpg";
import tornPaperTop from "../assets/tornpaper_at_the_top.png";
import tornPaperBottom from "../assets/tornpaper_at_the_bottom.png";

const HeroImage = () => {
  return (
    <>
      <div
        className="relative flex h-[1000px] bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Overlay image at the top */}
        <div className="absolute left-0 right-0 top-0">
          <img src={tornPaperTop} alt="Torn Paper Top" className="w-full" />
        </div>

        <div className="relative ml-10 flex flex-col items-start justify-center sm:w-full md:w-1/2">
          <h1 className="mb-4 text-left font-OpenSans font-extrabold text-[#deb37e] drop-shadow-custom sm:text-3xl md:text-7xl">
            IT&apos;S TIME TO PACK
          </h1>
          <p className="h-16 w-full text-left font-OpenSans text-xl font-semibold italic tracking-widest text-[#54524f] sm:w-3/4 md:w-96">
            PACKING LIST AT YOUR FINGER TIPS
          </p>
          <Link to={`/about`}>
            <div className="my-10 ml-4 flex">
              <button className="hover:border-none border h-12 w-56 rounded-full bg-white px-4 py-2 text-center font-OpenSans text-xl font-extrabold text-[#776c64] opacity-90 focus:border-2 focus:border-[#776c64] focus:outline-none">
                READ MORE
              </button>
            </div>
          </Link>

          {/* <p className="font-normal text-black text-xl my-3 ">
            Don't have an account? No worries!<strong>&nbsp;Sign up</strong>
            &nbsp; now
          </p>
          <Link to={`/signup`}>
            <button className="btn btn-primary my-3">Sign up</button>
          </Link> */}
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <img
            src={tornPaperBottom}
            alt="Torn Paper Bottom"
            className="w-full"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="font-OpenSans text-xl font-semibold italic tracking-widest text-[#54524f] my-3 ">
          Don't have an account? No worries!<strong>&nbsp;Sign up</strong>
          &nbsp; now
        </p>
        <Link to={`/signup`}>
        <button
        className=" border hover:border-none h-12 w-56 rounded-full bg-[#645a52] px-4 py-2 text-center font-OpenSans text-xl font-extrabold text-white opacity-90 focus:border-2 focus:border-white focus:outline-none hover:bg-[#5e544a] active:bg-[#4b423a]"
        aria-label="Sign up for an account "
      >
        Sign up
      </button>
        </Link>
      </div>
    </>
  );
};

export default HeroImage;
