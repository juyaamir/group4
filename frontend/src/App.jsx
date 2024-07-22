import LocationAPI from "./components/LocationAPI";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PersonalAccountDetail from "./pages/PersonalAccountDetail";

import { Routes, Route } from "react-router-dom";

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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/personal-account-detail"
          element={<PersonalAccountDetail />}
        />
      </Routes>
    </>
  );
};

export default App;
