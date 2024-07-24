import { Link } from "react-router-dom";
import image from "../assets/heroimage2.jpg";

const HeroImage = () => {
  return (
    <>
      <div
        className="min-h-screen bg-cover flex justify-left px-12"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="hero-content flex-col lg:flex-col opacity:200">
          <div>
            <h1 className="text-3xl font-black text-black my-3">Pack Your</h1>
            <h3 className="text-5xl font-bold text-black my-3">
              Packing-List With
            </h3>
            <h3 className="text-7xl font-medium text-black my-3">
              JourneyPack
            </h3>
            <p className="font-medium text-black text-xl my-3 ">
              If you're confused about what to pack for your trip our app
              <p>
                <strong className="font-white">&nbsp;JourneyPack&nbsp;</strong>
                is here to help
              </p>
            </p>
            <p className="font-normal text-black text-xl my-3 ">
              Don't have an account? No worries!<strong>&nbsp;Sign up</strong>
              &nbsp; now
            </p>
            <Link to={`/signup`}>
              <button className="btn btn-primary my-3">Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroImage;
