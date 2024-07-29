import ProductCard from "../components/ProductCard";
import AddNewProduct from "../components/AddNewProduct";

const Product = () => {
  let isUserAdmin = localStorage.getItem("isAdmin");
  return (
    <>
      <div className="border border-0 flex flex-col justify-center t px-10">
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
              <ProductCard category={"Travel Clothing"} />
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
              <ProductCard category={"Electronics"} />
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
              <ProductCard category={"Bags"} />
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
              <ProductCard category={"Cosmetics"} />
            </div>
          </div>
        </div>
        {isUserAdmin === "true" ? <AddNewProduct /> : null}
      </div>
    </>
  );
};

export default Product;
