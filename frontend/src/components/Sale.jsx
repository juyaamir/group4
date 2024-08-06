import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "./client";
import Heart from "react-heart";
import logo from "../assets/logo.png";

const Sale = ({ favAmazonProduct, setFavAmazonProduct, setProductId }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectBrand, setSelectBrand] = useState("all");
  const [counter, setCounter] = useState(0);
  const [activeStates, setActiveStates] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % 60);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async (type = "mobile") => {
    try {
      const entries = await client.getEntries({ content_type: type });
      return entries;
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  useEffect(() => {
    const getEntries = async () => {
      const entries = await fetchProducts("mobile");
      setData(entries?.items);
    };
    getEntries();
  }, []);

  const handleBrandChange = (e) => {
    setSelectBrand(e.target.value);
  };

  const toggleHeart = (id, imgurl, pname, rating) => {
    //Add product id to the favArray
    //setProductId((current) => [...current, id]);
    setFavAmazonProduct([
      ...favAmazonProduct,
      {
        productid: id,
        productimage: imgurl,
        productname: pname,
        productrating: rating,
      },
    ]);
    /*  setFavAmazonProduct((current) => [
      {
        ...current,
        ...{
          productid: id,
          productimage: imgurl,
          productname: pname,
          productrating: rating,
        },
      },
    ]); */
    /* (books) => [...books, ...x]; */
    /*   console.log(id); */
    //console.log(setFavArray);
    setActiveStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const filteredData =
    selectBrand === "all"
      ? data
      : data.filter((e) => e.fields.brand === selectBrand);

  return (
    <>
      <div className="bg-red-400 text-white p-3 mt-0 mb-3 text-center">
        <p className="text-3xl font-bold">Our Sale - Up to 60% Off</p>
        <p>Get the hottest styles at the lowest prices</p>
      </div>
      <div className="text-center mb-4">
        <div className="join ">
          <div>
            <div>
              <input
                className="input input-bordered join-item "
                placeholder="Search"
              />
            </div>
          </div>
          <select
            className="select select-bordered join-item"
            onChange={handleBrandChange}
          >
            <option value="all">--products--</option>
            <option value="Shoes">Shoes</option>
            <option value="Computer">Computer</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Hiking">Hiking</option>
            <option value="Camping">Camping</option>
            <option value="Fishing">Fishing</option>
            <option value="Essentials">Essentials</option>
            <option value="Toiletries">Toiletries</option>
            <option value="Swimming">Swimming</option>
            <option value="Photography">Photography</option>
            <option value="Cycling">Cycling</option>
            <option value="Snowboarding">Snowboarding</option>
            <option value="Skiing">Skiing</option>
            <option value="Beach">Beach</option>
            <option value="Mobile">Mobile</option>
          </select>
          <div className="indicator">
            <span className="indicator-item badge badge-secondary bg-red-700 ">
              Sale
            </span>
            <button className="btn  join-item border border-gray-300">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-6 flex-wrap  mx-24 justify-around ">
        {error ? (
          <div>Error: {error.message}</div>
        ) : (
          filteredData.map((e) => (
            <div
              key={e?.sys.id}
              className="card bg-base-100 w-52  hover:cursor-pointer hover:shadow-2xl sub-container"
            >
              <figure className=" pb-0 relative">
                <img
                  src={e?.fields.image.fields.file.url}
                  alt="mobile"
                  className=" h-64 w-full"
                />
                <img
                  src={logo}
                  alt="logo"
                  className="h-10 absolute w-10 rounded-full bottom2"
                />
              </figure>
              <button className="text-white bg-cyan-400 w-full h-10 hover:bg-slate-950">
                <Link to={`/sale/${e?.sys.id}`}>More Info</Link>
              </button>
              {/*       <div className="card-body  m-0 p-1"> */}
              <p className="text-red-500">
                <span className="text-white bg-red-500 p-1 mr-2">
                  {e?.fields.discount}% off{" "}
                </span>{" "}
                Ends in
                {/* Limited time deal!  console.log*/}
                <div
                  style={{ width: "1.5rem" }}
                  className=" absolute inline right-1"
                >
                  <Heart
                    isActive={activeStates[e?.sys.id] || false}
                    onClick={() =>
                      toggleHeart(
                        e?.sys.id,
                        e?.fields.image.fields.file.url,
                        e?.fields.mobileName,
                        e.fields.rating
                      )
                    }
                    animationScale={1.2}
                    activeColor="red"
                    inactiveColor="black"
                    animationDuration={0.9}
                  />
                </div>
                <div className="flex gap-2 text-red-400 font-mono justify-center mt-1">
                  <div>
                    <span className="countdown font-mono text-xl">
                      <span style={{ "--value": e?.fields.days }}></span>
                    </span>{" "}
                    <span className="bg-yellow-200">days</span>
                  </div>
                  <div>
                    <span className="countdown font-mono text-xl">
                      <span style={{ "--value": e?.fields.hours }}></span>
                    </span>{" "}
                    <span className="bg-yellow-200">hours</span>
                  </div>
                  <div>
                    <span className="countdown font-mono text-xl">
                      <span style={{ "--value": e?.fields.min }}></span>
                    </span>{" "}
                    <span className="bg-yellow-200">min</span>
                  </div>
                  <div>
                    <span className="countdown font-mono text-xl">
                      <span style={{ "--value": counter }}></span>
                    </span>{" "}
                    <span className="bg-yellow-200 rounded-md">sec</span>
                  </div>
                </div>
              </p>
              <p className="text-blue-700 text-center text-sm ">
                {e?.fields.mobileName}
              </p>
              <p className="text-center text-sm ">
                <i className="fa-solid fa-star text-orange-400"></i>
                <i className="fa-solid fa-star text-orange-400"></i>
                <i className="fa-solid fa-star text-orange-400"></i>
                <i className="fa-solid fa-star-half-stroke text-orange-400"></i>
                <i className="fa-solid fa-star-half-stroke text-orange-400"></i>
                {e.fields.rating}
              </p>
              {/* </div> */}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Sale;
