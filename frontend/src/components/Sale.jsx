import { useState, useEffect } from "react";
import {Link }from 'react-router-dom';
import {client} from "./client"
//import SaleCard from "./saleCard"
import Counter from './Counter';

const Sale = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectBrand, setSelectBrand] = useState('all');
    const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % 60);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


    const fetchProducts = async (type = "mobile") => {
        try {
          const entries = await client.getEntries({content_type: type});
          return entries;
        } catch (error) {
          console.error(error);
          setError(error);
        }
      };
      useEffect(() => {
        const getEntries = async() => {
          const entries = await fetchProducts("mobile");
          setData(entries?.items);
        } 
        getEntries();
       }, []);
       
       const handleBrandChange = (e) => {
        setSelectBrand(e.target.value);
      };

      const filteredData = selectBrand === 'all'? data: data.filter(e => e.fields.brand === selectBrand);

  return (
    <>
    <div className="bg-red-400 text-white p-3 mt-0 mb-3 text-center">
        <p className="text-3xl font-bold">Summer Sale - Up to 60% Off</p>
        <p>Get the hottest styles at the lowest prices</p>
    </div>
    <div className='text-center mb-4'>
    <div className="join ">
  <div>
    <div>
      <input className="input input-bordered join-item " placeholder="Search" />
    </div>
  </div>
  <select className="select select-bordered join-item"
  onChange={handleBrandChange}>
    <option value="all">--products--</option>
    <option value="Apple">Apple</option>
    <option value="Samsung">Samsung</option>
    <option value="Google">Google Pixel</option>
    <option value="VIVO">VIVO</option>
    <option value="Computer">Computer</option>
    <option value="Clothing">Clothing & Shoes</option>
   
  </select>
  <div className="indicator">
    <span className="indicator-item badge badge-secondary bg-red-700 ">Sale</span>
    <button className="btn  join-item border border-gray-300">Search</button>
  </div>
</div>
</div>
    <div className="flex gap-4 flex-wrap mx-16 justify-between">
        {
            error ? (
                <div>Error: {error.message}</div>
            ) : (
                filteredData.map((e) => (
                    <div key={e?.sys.id} className="card bg-base-100 w-52  hover:cursor-pointer hover:shadow-2xl sub-container">
                    <figure className=' pb-0'>
                        <img
                        src={e?.fields.image.fields.file.url}
                        alt="mobile" 
                        className=' h-64 w-full'
                        />
                    </figure>
                    <button className="text-white bg-cyan-400 w-2/3 h-10 hover:bg-slate-950">
                    <Link to={`/sale/${e?.sys.id}`}>More Info</Link>
                    </button>
                    <div className="card-body  m-0 p-1">
                        <p className='text-red-500'>
                        <span className='text-white bg-red-500 p-1 mr-2'>21% off </span> Ends in
                        {/* Limited time deal! */}
          
                      <div className="flex gap-2 text-red-400 font-mono justify-center">
                          <div>
                            <span className="countdown font-mono text-xl">
                              <span style={{ "--value": e?.fields.days }}></span>
                            </span> <span className='bg-yellow-200'>days</span>
                            
                          </div>
                          <div >
                            <span className="countdown font-mono text-xl">
                              <span style={{ "--value": e?.fields.hours }}></span>
                            </span> <span className='bg-yellow-200'>hours</span>
                          
                          </div>
                          <div>
                            <span className="countdown font-mono text-xl">
                              <span style={{ "--value": e?.fields.min }}></span>
                            </span> <span className='bg-yellow-200'>min</span>
                          
                          </div>
                          <div>
                            <span className="countdown font-mono text-xl">
                              <span style={{ "--value": counter }}></span>
                            </span> <span className='bg-yellow-200 rounded-md'>sec</span>
                        
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
                    </div>
                    </div>
                ))
            )
        }
    </div>




    </>
    
  )
}

export default Sale