import React from 'react';

const Stores = () => {
  return (
    <div>
      <h1 className='text-center text-2xl my-4 font-thin'>STORES</h1>
      <div className='border-red-400 border min-h-screen mb-10 mx-4 md:mx-10 lg:mx-60 flex flex-wrap'>
      <div className='border border-blue-200 w-full md:w-1/3 md:h-min p-2'>
        <form>
          <div className='flex flex-wrap md:flex-row '>
            <input
              type='text'
              placeholder='Type a postcode or address...'
              className='border-2 border-gray-200 rounded-md p-2 m-2 '
            />
            <button className='btn btn-primary bg-gray-600 hover:bg-gray-800 p-2 m-2'>
              {/* <i className="fa-brands fa-searchengin"></i> */}
              Search
            </button>
          </div>
        </form>
      </div>
        <div className='border border-blue-200 w-full md:w-2/3 p-2'>
          Google Map
        </div>
        <div className='border border-blue-200 w-full p-2'>
          Pictures..
        </div>
      </div>
    </div>
  );
};

export default Stores;