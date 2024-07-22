import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "../src/pages/HomePage/HomePage.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

import LocationAPI from "./components/LocationAPI";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HeroImage from "./components/HeroImage.jsx";


function App() {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
      <Routes>
        <Route path="/" element={<HeroImage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vacation-plan" element={<LocationAPI />} />
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
      <Footer />
    </div>
    </>
  );
}
export default App;
