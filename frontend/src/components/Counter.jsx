import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % 60);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=''>
      <div 
      className="flex gap-2 text-red-400 font-mono   justify-center   
      ">
        <div>
          <span className="countdown font-mono text-xl">
            <span style={{ "--value": 12 }}></span>
          </span> <span className='bg-yellow-200'>days</span>
          
        </div>
        <div >
          <span className="countdown font-mono text-xl">
            <span style={{ "--value": 10 }}></span>
          </span> <span className='bg-yellow-200'>hours</span>
         
        </div>
        <div>
          <span className="countdown font-mono text-xl">
            <span style={{ "--value": 24 }}></span>
          </span> <span className='bg-yellow-200'>min</span>
         
        </div>
        <div>
          <span className="countdown font-mono text-xl">
            <span style={{ "--value": counter }}></span>
          </span> <span className='bg-yellow-200 rounded-md'>sec</span>
       
        </div>
      </div>
    </div>
  );
};

export default Counter;