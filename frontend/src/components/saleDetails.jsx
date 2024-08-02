import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { client } from "./client";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { RotatingLines } from 'react-loader-spinner';
import Heart from 'react-heart';
import { HiOutlineShoppingCart } from "react-icons/hi";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [activeStates, setActiveStates] = useState({});

  const getMobileById = async (productId) => {
    try {
      const entry = await client.getEntry(productId);
      return entry;
     
    } catch (error) {
      console.log('Error fetching the Entry', error);
    }
  };

  useEffect(() => {
    const getMobile = async () => {
      const entry = await getMobileById(productId);
      setProduct(entry.fields);
    };
    getMobile();
  }, [productId]);

  const toggleHeart = (productId) => {
    setActiveStates((prevState) => ({
      ...prevState, [productId]: !prevState[productId]
    }))
  }
console.log(product);
  return (
    !product ? (
      <div className="relative inset-x-2/4 top-8">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    ) : (


      <div className="flex flex-wrap mx-auto my-6 border-2 border-gray-100 w-2/3 justify-around">
        <div className="w-80 p-2">
          <img src={product.image.fields.file.url} alt="product image" className=" hover:cursor-pointer" />
          
            <div className="flex  justify-between flex-wrap p-1 ">
                <div style={{width: "2rem"}} className="">
                <Heart 
                    isActive={activeStates[productId] || false} 
                    onClick={() => toggleHeart(productId)} 
                    animationScale={1.2} 
                    activeColor='red' 
                    inactiveColor='black' 
                    animationDuration={0.9}
                />   
            </div>
            <p className=" text-xl bg-red-500 text-white px-2">-{product.discount} %</p>
            {/* <p className="text-gray-500">Ships from: <span className=" underline">journeypack.com</span></p> */}
            
            <HiOutlineShoppingCart  className="text-4xl hover:cursor-pointer" onClick={()=> {<Link></Link>}}/>
            </div>
            <p className="mx-5 text-gray-500">Returns: <span className="  text-blue-500">Eligible for Return, Refund or Replacement within 30 days of receipt</span></p>
            
        </div>

        <div className="w-2/5 text-lg font-medium pr-8 pt-2">
          <p>{product.quickview.content[0].content[0].value}</p>
          <br />
          <div className="rating border-b-2 border-gray-300">
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
                defaultChecked />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        </div> {product.rating}
          <p className="text-red-600 p-1 text-sm">€{product?.price}</p>
          <h2 className="text-sky-400 text-base pr-8">FREE Returns</h2>
          <p className="text-xs italic">
            Prices for items sold by <span className="Sofia underline">JourneyPack</span> include VAT. Depending on your delivery address, VAT may vary at Checkout.
          </p>
          <br />
          <Tabs>
            <TabList>
              <Tab>Details</Tab>
              <Tab>More Information</Tab>
            </TabList>
            <TabPanel>
              <p className='text-xs'>{product.moreInformation.content[0].content[0].value}</p>
            </TabPanel>
            <TabPanel> 
              {
                !product.description ? (
                  <>
                    <p className='text-base font-bold'>MODEL : <span className='text-sm font-normal'>{product.model}</span></p>
                    <p className='text-base font-bold'>BRAND : <span className='text-sm font-normal'>{product.brand}</span></p>
                    <p className='text-base font-bold'>COLOR : <span className='text-sm font-normal'>{product.color}</span></p>
                    <p className='text-base font-bold'>SCREEN : <span className='text-sm font-normal'>{product.screen}</span></p>
                    <p className='text-base font-bold'>PROCESSOR : <span className='text-sm font-normal'>{product.processor}</span></p>
                    <p className='text-base font-bold'>RAM : <span className='text-sm font-normal'>{product.ram}</span></p>
                  </>
                ) : (
                  <p className='text-base font-bold'>Product Description : <span className='text-sm font-normal'>{product.description.content[0].content[0].value}</span></p>
                )
              }

            </TabPanel>
          </Tabs>
        </div>
      </div>
    )
  );
};

export default ProductDetails;