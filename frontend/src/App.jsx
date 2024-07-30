import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

import PlanYourVacation from "./pages/PlanYourVacation.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [islogged, setIslogged] = useState(false);

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
    console.log("from App useEffect", token);

    getuserlogged();
  }, [token]);

  console.log("from App", token);
  return (
    <>
      <Header islogged={islogged} />

      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />

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
    </>
  );
}
export default App;
