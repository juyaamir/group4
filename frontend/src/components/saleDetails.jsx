import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { client } from "./client";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { RotatingLines } from 'react-loader-spinner';
import Heart from 'react-heart';
import { NavLink } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import logo from '../assets/logo.png'

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeStates, setActiveStates] = useState({});
  const [buy, setBuy] = useState(false);
  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setBuy(true);
  };

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
    <div className="flex flex-wrap mx-auto my-6 border-2 border-gray-200 w-2/3 justify-around rounded-lg ">
        <div className="w-80 p-3">
          <div className="relative">
            <img src={product.image.fields.file.url} alt="product image" className=" hover:cursor-pointer" />
            <img src={logo} alt="logo" className="h-10 absolute w-10 rounded-full bottom" />
            </div>
          
          
            <div className="flex  justify-between flex-wrap p-1 ">
              <div style={{width: "1.5rem"}} className="">
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
            {
              !buy ? 
              (<div className=""><MdAddShoppingCart  className="text-3xl text-gray-400 cursor-not-allowed" /></div>) : 
              (<div className=""><MdAddShoppingCart  className="text-4xl hover:cursor-pointer" /></div>)
            }
            
            </div>
            <p className="text-gray-500">Ships from: <span className=" underline">journeypack.com</span></p>
            <p className=" text-gray-500">Returns: <span className="  text-blue-500">Eligible for Return, Refund or Replacement within 30 days of receipt</span></p>
            
        </div>

        <div className="w-3/5 text-lg font-medium pr-8 pt-2">
          <p>{product.quickview.content[0].content[0].value}</p>
          <br />
          <div className="rating border-b border-gray-300 pb-1">
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
                defaultChecked />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        </div> <span className="text-sm text-gray-500">{product.rating}</span> 
          <p className="text-red-600 p-1 "><span className="bg-red-600 text-white text-base px-1">Limited time deal</span> €{product?.price}</p>
          {
                product?.brand === "Clothing" ? (
                  <div>
                    <p>Size:</p>
                    <ul className="flex gap-4 flex-wrap">
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'].map(size => (
                        <li key={size}>
                          <NavLink
                            to="#"
                            onClick={() => handleSizeClick(size)}
                            style={{ backgroundColor: selectedSize === size ? 'white' : 'white',
                              fontWeight: selectedSize === size ? 'bold' : 'normal',
                              borderBottom: selectedSize === size ? '2px solid black' : '1px dashed gray'
                            }}
                            className="border-b-2 border-gray-200 px-4 hover:bg-black"
                          >
                            {size}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
          }
          {
              product?.brand === "Shoes" ? (
                  <div>
                    <p>Size:</p>
                    <ul className="flex gap-4 flex-wrap text-sm">
                      {['39 EU', '40 EU', '41 EU', '42 EU', '43 EU', '44 EU', '45 EU'].map(size => (
                        <li key={size}>
                          <NavLink
                            to="#"
                            onClick={() => handleSizeClick(size)}
                            style={{ backgroundColor: selectedSize === size ? 'white' : 'white',
                              fontWeight: selectedSize === size ? 'bold' : 'normal',
                              borderBottom: selectedSize === size ? '2px solid black' : '1px dashed gray'
                            }}
                            className="border-b-2 border-gray-200 px-4 hover:bg-black"
                          >
                            {size}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
          }
            {
            product?.brand === "Photography" ? (
                  <div>
                    <p>Color:</p>
                    <ul className="flex gap-4 flex-wrap text-sm">
                      {['Black', 'White', ' Blossom Pink', 'Clay white', 'Pastel Blue'].map(size => (
                        <li key={size}>
                          <NavLink
                            to="#"
                            onClick={() => handleSizeClick(size)}
                            style={{ backgroundColor: selectedSize === size ? 'white' : 'white',
                              fontWeight: selectedSize === size ? 'bold' : 'normal',
                              borderBottom: selectedSize === size ? '2px solid black' : '1px dashed gray'
                            }}
                            className="border-b-2 border-gray-200 px-4 hover:bg-black"
                          >
                            {size}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
            ) : null
          }
          {
            product?.brand === "Skiing" ? (
                  <div>
                    <p>Size:</p>
                    <ul className="flex gap-4 flex-wrap text-sm">
                      {['M', 'L', 'XL', 'XXL', '3XL'].map(size => (
                        <li key={size}>
                          <NavLink
                            to="#"
                            onClick={() => handleSizeClick(size)}
                            style={{ backgroundColor: selectedSize === size ? 'white' : 'white',
                              fontWeight: selectedSize === size ? 'bold' : 'normal',
                              borderBottom: selectedSize === size ? '2px solid black' : '1px dashed gray'
                            }}
                            className="border-b-2 border-gray-200 px-4 hover:bg-black"
                          >
                            {size}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
            ) : null
          }
          {
            product?.brand === "Mobile" ? (
                  <div>
                    <p>Size Name:</p>
                    <ul className="flex gap-4 flex-wrap text-sm">
                      {['64 GB', '128 GB', '256 GB', '512 GB', '1 TB'].map(size => (
                        <li key={size}>
                          <NavLink
                            to="#"
                            onClick={() => handleSizeClick(size)}
                            style={{ backgroundColor: selectedSize === size ? 'white' : 'white',
                              fontWeight: selectedSize === size ? 'bold' : 'normal',
                              borderBottom: selectedSize === size ? '2px solid black' : '1px dashed gray'
                            }}
                            className="border-b-2 border-gray-200 px-4 hover:bg-black"
                          >
                            {size}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
            ) : null
          }
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