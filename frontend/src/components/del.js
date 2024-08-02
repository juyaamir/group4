import { useState, useEffect } from "react";
import {Link }from 'react-router-dom';
import {client} from 
import bag from '../assets/bag.jpg';
import Counter from './Counter';

const SaleCard = () => {
  return (
    <div>
<div className="card bg-base-100 w-64  hover:cursor-pointer hover:shadow-2xl">
  <figure className='h-96 pb-0'>
    <img
      src={bag}
      alt="Shoes" 
      className=' h-full w-full'
      />
  </figure>
  <div className="card-body pt-1">
    <p className='text-red-500'>
    <span className='text-white bg-red-500 p-1 mr-2'>21% off </span> Ends in
    {/* Limited time deal! */}
    <Counter />
    </p>
    <p className='text-sm'>Beibye 2066 Twin-Roller, Hard-Shell Trolley Suitcases, M, L and XL Luggage Set, black, Set</p>

  </div>
</div>
    </div>
  )
}

export default SaleCard