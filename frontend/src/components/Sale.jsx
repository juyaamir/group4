import SaleCard from "./saleCard"

const Sale = () => {
  return (
    <>
    <div className='text-center'>
    <div className="join ">
  <div>
    <div>
      <input className="input input-bordered join-item " placeholder="Search" />
    </div>
  </div>
  <select className="select select-bordered join-item">
    <option disabled selected>Filter</option>
    <option>WOMEN</option>
    <option>MEN</option>
  </select>
  <div className="indicator">
    <span className="indicator-item badge badge-secondary bg-red-700 ">Sale</span>
    <button className="btn  join-item border border-gray-300">Search</button>
  </div>
</div>
    </div>
    <div className="m-10 flex flex-wrap justify-between gap-y-4 ">
        <SaleCard />
        <SaleCard />
        <SaleCard />
        <SaleCard />
        <SaleCard />
        <SaleCard />
        <SaleCard />
    </div>
    </>
    
  )
}

export default Sale