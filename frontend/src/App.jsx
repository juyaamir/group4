import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import HomePage from "../src/pages/HomePage/HomePage.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import LocationAPI from "./components/LocationAPI";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import SignUp from "./pages/SignUp";
// import Login from "./pages/Login";
import PersonalAccountDetail from "./pages/PersonalAccountDetail";

import Product from "./pages/Product";
import OrderSummary from "./pages/OrderSummary";
import Checkout from "./pages/Checkout";
import AskFromAi from "./pages/AskFromAi";

function App() {
  return (
    <>
      <div>
        <LocationAPI />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/personal-account-detail"
          element={<PersonalAccountDetail />}
        />
        <Route path="/products" element={<Product />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ask-from-ai" element={<AskFromAi />} />

        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/home" element={<HomePage />} /> */}
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
    </>
  );
}

export default App;
