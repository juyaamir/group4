import { useState, useEffect } from "react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "./components/ThemeContext.jsx";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import SignOut from "./components/SignOut.jsx";
//import IsLogged from "./components/IsLogged.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Product from "./pages/Product.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart.jsx";
import Stores from "./components/Stores.jsx";

import PlanYourVacation from "./pages/PlanYourVacation.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import FavProduct from "./components/FavProduct.jsx";
import ImageDescription from "./pages/ImageDescription.jsx";

import WelcomeMessage from "./components/WelcomeMessage.jsx";
import Sale from "./components/Sale.jsx";
import ProductDetails from "./components/saleDetails.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [islogged, setIslogged] = useState(false);
  const [user, setUser] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [productArray, setProductArray] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [favArray, setFavArray] = useState([]);

  // console.log(islogged);

  /* const signout = () => {
    localStorage.clear();
    console.log("You signed out");
    }; */
  const getuserlogged = () => {
    if (token) {
      setIslogged(true);
    } else {
      setIslogged(false);
    }
  };
  useEffect(() => {
    // console.log("from App useEffect", token);

    getuserlogged();
  }, [token]);

  //  console.log("from App", token);
  return (
    <ThemeProvider>
      <Header
        islogged={islogged}
        productCount={productCount}
        productArray={productArray}
        productPrice={productPrice}
      />

      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          {islogged && user && <WelcomeMessage firstName={user.firstname} />}
          <Routes>
            <Route path="/" element={<Home setUser={setUser} />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/product"
              element={
                <Product
                  productCount={productCount}
                  setProductCount={setProductCount}
                  productArray={productArray}
                  setProductArray={setProductArray}
                  productPrice={productPrice}
                  setProductPrice={setProductPrice}
                  setFavArray={setFavArray}
                />
              }
            />
            <Route path="/stores" element={<Stores />} />

            <Route
              path="/image-description/:id"
              element={
                <ImageDescription
                  productCount={productCount}
                  setProductCount={setProductCount}
                  setProductArray={setProductArray}
                  productPrice={productPrice}
                  setProductPrice={setProductPrice}
                />
              }
            />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/sale/:productId" element={<ProductDetails />} />

            <Route
              path="/profile/:id"
              element={<Profile setUser={setUser} />}
            />

            <Route
              path="/cart"
              element={
                <Cart
                  productArray={productArray}
                  setProductArray={setProductArray}
                  productPrice={productPrice}
                  setProductPrice={setProductPrice}
                />
              }
            />

            <Route
              path="/favourite-product"
              element={<FavProduct favArray={favArray} />}
            />
            <Route path="/signin" element={<Login setToken={setToken} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signout" element={<SignOut setToken={setToken} />} />
            <Route
              path="/plan-your-vacation"
              element={<PlanYourVacation userlogged={islogged} />}
            />
          </Routes>

          <ToastContainer
            position="top-right"
            limit={1}
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
      <Footer />
    </ThemeProvider>
  );
}
export default App;
