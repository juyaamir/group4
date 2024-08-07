import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { Image } from "antd";
import { MdAddShoppingCart } from "react-icons/md";
import { Watermark } from "antd";
const FavProduct = ({
  favArray,
  setFavArray,
  productArray,
  setProductArray,
  setProductCount,
  favAmazonProduct,
  setFavAmazonProduct,
}) => {
  const [favproduct, setFavproduct] = useState(null);

  /*  console.log(favAmazonProduct); */
  /* console.log(productId);
  const [itemid, setItemid] = useState(null); */
  const deleteProduct = (id) => {
    var index = favArray.indexOf(id);
    favArray.splice(index, 1);
    // favArray.remove(id);
    setFavArray([...favArray]);
  };
  /*  const handleclickAmazon = (productindex) => {
    pid = productId[productindex];
    setItemid(pid);
    console.log(pid);
  }; */
  const deleteAmazonProduct = (id) => {
    /*  var index = favAmazonProduct.indexOf(id); */
    let index = id;
    favAmazonProduct.splice(index, 1);
    /* favAmazonProduct.remove(index); */
    setFavAmazonProduct([...favAmazonProduct]);
    // setFavAmazonProduct([...favAmazonProduct]);
  };
  const handleClick = (productId, price) => (event) => {
    /*  console.log(productId); */
    setProductArray((current) => [...current, productId]);
    let length = productArray.length + 1;
    setProductCount(length);
    /*  console.log(length); */
    /*  setProductPrice((cur) => [...cur, price]);
    console.log(setProductPrice); */
  };
  useEffect(() => {
    axios
      .post(`http://localhost:8000/api/v1/product`, { favArray })
      // .then((response) => setUser(response.data))
      .then((response) => setFavproduct(response.data))
      .catch((err) => {
        console.error(err);
      });
  }, [favArray]);

  /*   useEffect(() => {}, [favAmazonProduct]);
  console.log(favAmazonProduct.map((item) => item.productid)); */

  /*   useEffect(() => {}, [favAmazonProduct]);
  console.log(favAmazonProduct.map((item) => item.productid)); */
  return (
    <>
      <Watermark content={["Journey Pack", "Happy Traveling"]}>
        <div>
          <h1 className="text-4xl text-center m-8">Favorite Products</h1>
          {favproduct ? (
            <div className="flex flex-row flex-wrap gap-8 border border-2 rounded-md text-center m-8">
              {favproduct?.map((item, key) => (
                <div
                  key={item._id}
                  className="card bg-base-200 w-64 shadow-xl rounded-md"
                >
                  <div className="card-body  text-center">
                    <figure className="px-8 relative max-w-full ">
                      <Link to={`/image-description/${item._id}`}>
                        <Image
                          width={200}
                          src={item.image}
                          alt={item.productname}
                        />
                      </Link>
                      <div className="absolute top-0 right-8 m-2">
                        <div style={{ width: "0.5rem" }}>
                          <Button
                            type="danger"
                            shape="circle"
                            onClick={() => {
                              deleteProduct(item._id);
                            }}
                          >
                            <RxCrossCircled />
                          </Button>
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-0 m-2">
                        <button
                          className=" text-xl text-blue-300 mr-0 mb-0"
                          onClick={handleClick(item._id, item.price)}
                        >
                          <MdAddShoppingCart />
                        </button>
                      </div>
                    </figure>
                    <h2 className="card-title text-xl">{item.productname}</h2>
                    <p>
                      <div className="text-md">
                        Price :&nbsp; {item.price}&nbsp;€
                      </div>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-2xl text-center m-8"></div>
          )}
          <div>
            {favAmazonProduct ? (
              <div className="flex flex-row flex-wrap gap-8 border border-2 rounded-md text-center m-8">
                {favAmazonProduct?.map((item, index) => (
                  <div className=" bg-base-200 w-64 shadow-xl rounded-md">
                    <div key={index} className="  text-center">
                      <figure className="px-8 relative max-w-full ">
                        <Image width={200} src={item.productimage} alt="" />
                        <div className="absolute top-0 right-16 m-2">
                          <div style={{ width: "0.5rem" }}>
                            <Button
                              shape="circle"
                              onClick={() => {
                                deleteAmazonProduct(index);
                              }}
                            >
                              <RxCrossCircled />
                            </Button>
                          </div>
                        </div>
                      </figure>
                      <button className="text-white bg-cyan-400 w-full h-10 hover:bg-slate-950">
                        <Link to={`/sale/${item.productid}`}>More Info</Link>
                      </button>
                      <h2 className=" text-sm">{item.productname}</h2>
                      <p></p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Watermark>
    </>
  );
};
export default FavProduct;
