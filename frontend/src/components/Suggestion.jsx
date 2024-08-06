import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { client } from "./client";
import Heart from 'react-heart';
import logo from '../assets/logo.png';
import Bounce from "./Bounce";

const Suggestion = ({ activities }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectBrand, setSelectBrand] = useState('all');
  const [counter, setCounter] = useState(0);
  const [activeStates, setActiveStates] = useState({});
  const [showBounce, setShowBounce] = useState(false); // State to control Bounce visibility

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
    setTimeout(() => {
      getEntries();
      setShowBounce(true); // Show Bounce after fetching data
    }, 4000);
  }, []);

  const toggleHeart = (id) => {
    setActiveStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const filteredData = activities.length === 0 ? data : data.filter((e) => activities.includes(e.fields.brand));

  return (
    <div>
      <div className="text-white bg-cyan-700 p-3 mb-3 text-center">
        <p className="text-xl font-bold">Our Suggestion for you</p>
        <p className="text-sm">Check out our latest products and enjoy your shopping</p>
      </div>

      <div className="flex gap-2 gap-y-6 flex-wrap mx-2 justify-around">
        {error ? (
          <div>Error: {error.message}</div>
        ) : (
          filteredData.map((e) => (
            <div key={e?.sys.id} className="card bg-base-100 w-40 hover:cursor-pointer hover:shadow-2xl sub-container relative">
              <figure className="pb-0 relative">
                <img src={e?.fields.image.fields.file.url} alt="mobile" className="h-52 w-full" />
                <img src={logo} alt="logo" className="h-10 absolute w-10 rounded-full bottom2" />
              </figure>
              <button className="text-white bg-cyan-400 w-full h-10 hover:bg-slate-950">
                <Link to={`/sale/${e?.sys.id}`}>More Info</Link>
              </button>
              <div className="card-body m-0 p-1 relative">
                <div style={{ width: "1.5rem" }} className="absolute right-1">
                  <Heart
                    isActive={activeStates[e?.sys.id] || false}
                    onClick={() => toggleHeart(e?.sys.id)}
                    animationScale={1.2}
                    activeColor="red"
                    inactiveColor="black"
                    animationDuration={0.9}
                  />
                </div>
                <p className="text-blue-700 text-center text-sm mt-5">{e?.fields.mobileName}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {showBounce && <Bounce />} {/* Conditionally render Bounce */}
    </div>
  );
};

export default Suggestion;