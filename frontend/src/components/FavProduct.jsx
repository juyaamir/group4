import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { Image } from "antd";
import { MdAddShoppingCart } from "react-icons/md";

const FavProduct = ({ favArray, setFavArray }) => {
  const [favproduct, setFavproduct] = useState(null);
  console.log(favArray);

  const deleteProduct = (id) => {
    var index = favArray.indexOf(id);
    favArray.splice(index, 1);
    // favArray.remove(id);
    setFavArray([...favArray]);
  };

  const handleClick = (productId, price) => (event) => {
    console.log(productId);
    setProductArray((current) => [...current, productId]);
    console.log(productArray);
    setProductCount(productArray.length);
    console.log(productArray.length);
    setProductPrice(price);
    console.log(price);
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

  return (
    <div className="flex flex-row flex-wrap gap-8 rounded-md text-center m-8">
      {favproduct?.map((item, key) => (
        <div
          key={item._id}
          className="card bg-base-200 w-64 shadow-xl rounded-md"
        >
          <div className="card-body  text-center">
            <figure className="px-8 relative max-w-full ">
              <Link to={`/image-description/${item._id}`}>
                <Image width={200} src={item.image} alt={item.productname} />
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
                {/* <button
                  className=" text-xl text-blue-300 mr-0 mb-0"
                  onClick={handleClick(item._id, item.price)}
                >
                  <MdAddShoppingCart />
                </button> */}
              </div>
            </figure>
            <h2 className="card-title text-xl">{item.productname}</h2>
            <p>
              <div className="text-md">Price :&nbsp; {item.price}&nbsp;€</div>
            </p>
          </div>
        </div>
      ))}
      {/*  <table className="table">
      

        <thead>
          <tr>
            <th></th>
            <th>Product Name</th>
          </tr>
        </thead>
        {favproduct?.map((item, key) => (
          <tbody>
          

            <tr key={item._id}>
              <th></th>
              <td>
                <strong>{item.productname}</strong>
              </td>
              <td>
                <strong>{item.price}&nbsp; €</strong>
              </td>
              <td>
                <img width={50} src={item.image} />
              </td>
              <td>
                <Button
                  type="dashed"
                  danger
                  onClick={() => {
                    deleteProduct(item._id);
                  }}
                >
                  <DeleteOutlined />
                </Button>
              </td>
            </tr>
        
          </tbody>
        ))}
      </table> */}
    </div>
  );
};

export default FavProduct;
