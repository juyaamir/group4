import React from 'react'
import bag from '../assets/bag.jpg';
import Counter from './Counter';
const SaleCard = () => {
  return (
    <div>
<div className="card bg-base-100 w-60  shadow-xl hover:cursor-pointer">
  <figure className='h-96'>
    <img
      src={bag}
      alt="Shoes" 
      className=' h-full w-full'
      />
  </figure>
  <div className="card-body">
    <p>
        <Counter />
    </p>
    <p className='text-red-500'>
    <span className='text-white bg-red-500 p-1 mr-2'>21% off </span> 
    Limited time deal!</p>
    <p className='text-sm'>Beibye 2066 Twin-Roller, Hard-Shell Trolley Suitcases, M, L and XL Luggage Set, black, Set</p>

  </div>
</div>
    </div>
  )
}

export default SaleCard