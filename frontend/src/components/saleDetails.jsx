import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { client } from "./client";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { RotatingLines } from 'react-loader-spinner';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams();

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
      <div className="flex flex-wrap w-5/6 mx-auto my-6">
        <div className="w-2/5 p-2">
          <img src={product.image.fields.file.url} alt="product image" className="h-96 hover:cursor-pointer" />
        </div>

        <div className="w-2/5 text-lg font-medium pr-8 py-2">
          <p>{product.quickview.content[0].content[0].value}</p>
          <br />
          <p className="text-sm border-b-2 border-gray-300 pr-8">
            <i className="fa-solid fa-star text-orange-400"></i>
            <i className="fa-solid fa-star text-orange-400"></i>
            <i className="fa-solid fa-star text-orange-400"></i>
            <i className="fa-solid fa-star text-orange-400"></i>
            <i className="fa-solid fa-star-half-stroke text-orange-400"></i>
            {product.rating}
            
          </p>
          <p className="text-red-600 p-1 text-sm">€{product?.price}</p>
          <h2 className="text-sky-400 text-base pr-8">FREE Returns</h2>
          <p className="text-xs italic">
            Prices for items sold by TechTop include VAT. Depending on your delivery address, VAT may vary at Checkout.
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

        <div className="w-1/5 p-2 border rounded-lg">
          <p className="p-2 font-light text-lg"><sup>€</sup>{product?.price}</p>
          <p className="mb-2">Delivery <span className="font-bold">{product?.delivery}</span></p>

          <button
            className="bg-yellow-300 w-full mt-4 rounded-xl border border-yellow-400 py-1 hover:bg-yellow-400 hover:border-none"
            title="Buy Now">
            <Link to='/signin'>Add to Cart</Link>
          </button>
          <button
            className="bg-orange-300 w-full my-4 rounded-xl border border-orange-400 py-1 hover:bg-orange-400 hover:border-none"
            title="Buy Now">
            <Link to='/signin'>Buy Now</Link>
          </button>
          <p className="text-gray-500 text-sm">Ships from: <span className="text-gray-600"> Techtop.com</span></p><br />
          <p className="text-gray-500 text-sm">Returns: <span className="text-sky-600">
            Eligible for Return, Refund or Replacement within 30 days of receipt
          </span></p><br />
        </div>
      </div>
    )
  );
};

export default ProductDetails;