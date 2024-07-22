import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "../src/pages/HomePage/HomePage.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

import LocationAPI from "./components/LocationAPI";
import Home from "./pages/Home";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HeroImage from "./components/HeroImage.jsx";


function App() {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <HeroImage />
        <HomePage />
      <LocationAPI />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home2" element={<Home />} />
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


/* 
const App = () => {
  return (
    <>
      <div>
        <LocationAPI />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/personal-account-detail"
          element={<PersonalAccountDetail />}
        />
        <Route path="/products" element={<Product />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ask-from-ai" element={<AskFromAi />} />
      </Routes>
    </>
  );
};
 */
export default App;
