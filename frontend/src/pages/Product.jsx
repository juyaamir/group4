import ProductCard from "../components/ProductCard";
import AddNewProduct from "../components/AddNewProduct";
import { Select, Space } from "antd";
import dogpic from "../assets/dogpic.jpg";
import beautifulpic from "../assets/beautiful-pic.jpg";
import nangaparbat from "../assets/nangaparbat.jpg";
import rakaposhi from "../assets/rakaposhi.jpg";

import { Carousel } from "antd";

const contentStyle = {
  height: "360px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#c0c0c0",
};

const Product = ({
  productCount,
  setProductCount,
  productArray,
  setProductArray,
  productPrice,
  setProductPrice,
  setFavArray,
}) => {
  let isUserAdmin = localStorage.getItem("isAdmin");
  //let isUserAdmin = "true";
  let categories = [
    "Travel Clothing",
    "Electronics",
    "Bags",
    "Camping Gear",
    "Accessories",
  ];

  return (
    <>
      <div>
        {/*  <Carousel autoplay>
          <div>
            <h3 style={contentStyle} className="border border-0 text-center">
              <img src={beautifulpic} className="w-full h-full" />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img src={dogpic} className="w-full h-full" />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img src={rakaposhi} className="w-full h-full" />
            </h3>
          </div>
        </Carousel> */}
      </div>

      <div role="tablist" className="tabs tabs-lifted m-10 rounded-md">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Travel Clothing"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <ProductCard
            category={categories[0]}
            productCount={productCount}
            setProductCount={setProductCount}
            productArray={productArray}
            setProductArray={setProductArray}
            productPrice={productPrice}
            setProductPrice={setProductPrice}
            setFavArray={setFavArray}
          />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Electronics"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <ProductCard
            category={categories[1]}
            productCount={productCount}
            setProductCount={setProductCount}
            productArray={productArray}
            setProductArray={setProductArray}
            productPrice={productPrice}
            setProductPrice={setProductPrice}
            setFavArray={setFavArray}
          />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Bags"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <ProductCard
            category={categories[2]}
            productCount={productCount}
            setProductCount={setProductCount}
            productArray={productArray}
            setProductArray={setProductArray}
            productPrice={productPrice}
            setProductPrice={setProductPrice}
            setFavArray={setFavArray}
          />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Camping Gear"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <ProductCard
            category={categories[3]}
            productCount={productCount}
            setProductCount={setProductCount}
            productArray={productArray}
            setProductArray={setProductArray}
            productPrice={productPrice}
            setProductPrice={setProductPrice}
            setFavArray={setFavArray}
          />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Accessories"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <ProductCard
            category={categories[4]}
            productCount={productCount}
            setProductCount={setProductCount}
            productArray={productArray}
            setProductArray={setProductArray}
            productPrice={productPrice}
            setProductPrice={setProductPrice}
            setFavArray={setFavArray}
          />
        </div>
      </div>

      {/* <div className="border border-0 flex flex-col justify-center t px-10">
        <div role="tablist" className="tabs tabs-lifted w-full">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Travel Clothing"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <div className="flex gap-4">
              <ProductCard category={categories[0]} />
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Electronics"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <div className="flex gap-4">
              <ProductCard category={categories[1]} />
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            role="tab"
            className="tab"
            aria-label="Bags "
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <div className="flex gap-4">
              <ProductCard category={categories[2]} />
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_4"
            role="tab"
            className="tab"
            aria-label="Cosmetics"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <div className="flex gap-4">
              <ProductCard category={categories[3]} />
            </div>
          </div>
        </div>
      </div> */}

      <div> {isUserAdmin === "true" ? <AddNewProduct /> : null}</div>
    </>
  );
};

export default Product;
