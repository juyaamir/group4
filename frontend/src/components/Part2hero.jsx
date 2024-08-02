import shadowImage from "../assets/shadow.png";
import image1 from "../assets/03_01.png";
import image2 from "../assets/02_02.png";
import image3 from "../assets/04_01.png";
import { Link } from "react-router-dom";

const Part2hero = () => {
  return (
    <div className="relative overflow-hidden">
      <img
        src={shadowImage}
        alt="Shadow"
        className="-translate-x-1/10 absolute bottom-0 left-0 h-1/2 w-1/2 scale-x-[-1] transform opacity-90"
      />

      <div className="flex h-1/2 flex-col items-center justify-between space-y-4 md:h-auto md:flex-row">
        <div className="flex flex-col items-center justify-between space-y-4 py-4 md:space-y-6 md:py-8">
          <div className="font-OpenSans">
            <Link to={`/signup`}>
              <button className="h-12 w-56 rounded-full bg-white px-4 py-2 text-center font-OpenSans text-xl font-extrabold text-[#776c64] opacity-90 focus:border-2 focus:border-[#776c64] focus:outline-none">
                Sign up
              </button>
            </Link>
          </div>
          <p className="h-52 w-1/2 text-center font-OpenSans text-xl font-normal text-custom-gray md:text-2xl">
            Don't have an account? No worries!<strong>&nbsp;Sign up</strong>
            &nbsp; now
          </p>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:gap-24">
            <div className="flex flex-col rounded-sm">
              <img
                src={image1}
                alt="Image 1"
                className="mt-[-120px] w-full rounded-sm object-cover"
              />
              <div className="flex h-56 w-full items-center justify-center rounded-sm bg-[#7f7770]">
                <div className="ml-4 text-left font-OpenSans text-white">
                  <p className="text-2xl font-semibold">Lorem ipsum</p>
                  <p className="pt-2 text-xl font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipisicing...
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-sm">
              <img
                src={image2}
                alt="Image 2"
                className="mt-[-120px] w-full rounded-sm object-cover"
              />
              <div className="flex h-56 w-full items-center justify-center rounded-sm bg-[#7f7770]">
                <div className="ml-4 text-left font-OpenSans text-white">
                  <p className="text-2xl font-semibold">Lorem ipsum</p>
                  <p className="pt-2 text-xl font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipisicing...
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-sm">
              <img
                src={image3}
                alt="Image 3"
                className="mt-[-120px] w-full rounded-sm object-cover"
              />
              <div className="flex h-56 w-full items-center justify-center rounded-sm bg-[#7f7770]">
                <div className="ml-4 text-left font-OpenSans text-white">
                  <p className="text-2xl font-semibold">Lorem ipsum</p>
                  <p className="pt-2 text-xl font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipisicing...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part2hero;
