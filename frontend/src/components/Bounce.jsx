import { Link } from "react-router-dom";

const Bounce = () => {
  return (
    <div className='text-center'>
      <div>
        <svg className="animate-bounce w-8 h-6">
        </svg>
        <p className="rounded-full text-3xl bounce bg-green-400 px-3 text-white py-2">
          <i className="fa-solid fa-arrow-down"></i>
        </p>
      </div>
      <Link to='/product'>
        <button 
          className="bg-green-500 font-mono text-2xl hover:bg-green-600 hover:cursor-pointer 
          text-white font-bold py-2 rounded mt-3 w-full border hover:border-none"
        >
          Click to Load More...
        </button>
      </Link>
    </div>
  );
};

export default Bounce;