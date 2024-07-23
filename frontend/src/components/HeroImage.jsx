import { Link } from "react-router-dom";
const HeroImage = () => {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="carousel w-full">
          <div id="item1" className="carousel-item w-full">
            <img
              src="https://th.bing.com/th/id/R.a6c6d288c30237635f581fc2a2a7291d?rik=eRr9TbJ8CkM0QQ&pid=ImgRaw&r=0"
              className="w-full"
            />
          </div>
        </div>
        <div className="hero-content text-left">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">
              <Link to="/signin">Sign In</Link>{" "}
            </button>
            <button className="btn btn-outline btn-success ml-10">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroImage;
