import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import AddNewProduct from "./AddNewProduct";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import UpdateProduct from "./UpdataProduct";

const ProductCard = (c) => {
  const [productItem, setProductItem] = useState([]);
  //console.log(c["category"]);
  let category = c["category"];

  /*  const newdata = {
    productname: productname,
    price: price,
    category: category,
  }; */

  ///DELETE Product//
  const handleClick2 = (item) => {
    axios.delete(`http://localhost:8000/api/v1/product/${item}`);
  };

  ///EDIT Product//
  /*  const handleClick3 = (item) => {
    axios.put(`http://localhost:8000/api/v1/product/${item}`);
  }; */

  //get items//7
  const getitems = () => {
    axios
      .get(`http://localhost:8000/api/v1/product?category=${category}`)
      .then((response) => {
        setProductItem(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getitems();
  }, []);

  /*   console.log(productItem.map((item) => item._id));
  console.log(productItem.map((item) => item.productname));
  console.log(productItem.map((item) => item.price));
  console.log(productItem.map((item) => item.category));

  const itemcategory = productItem.map((item) => item.category); */

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        {productItem?.map((item) => (
          <div
            key={item._id}
            className="card card-compact bg-base-100 w-60 shadow-xl"
          >
            <figure>
              <img src="" alt={item.productname} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.productname}</h2>
              <p>Price :&nbsp;{item.price} &nbsp;Euro </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="collapse">
                <input type="checkbox" />
                <div className="collapse-title text-md font-small">
                  <Button type="dashed" icon={<EditOutlined />}></Button>
                </div>
                <div className="collapse-content">
                  <p>
                    <UpdateProduct itemid={item._id} />
                  </p>
                </div>
              </div>
              <div>
                <Button
                  className="mt-4 mr-3"
                  type="dashed"
                  icon={<DeleteOutlined />}
                  onClick={() => handleClick2(item._id)}
                ></Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddNewProduct />

      {/*   <button
        className="border border-solid rounded-md text-white bg-black p-2 my-6 justify-end"
        onClick={() => handleClick1(newdata)}
      >
        Create New Product
      </button> */}
    </div>
  );
};

export default ProductCard;
