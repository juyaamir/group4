import { useState } from "react";
//import { motion } from "framer-motion";

import Login from "../../components/Login.jsx";
import Signup from "../../components/Signup.jsx";

const Registration = () => {
  const [islogin, setIslogin] = useState(true);

  const toggleForm = () => {
    setIslogin(!islogin);
  };

  return (
    <section className="pt-12 h-screen">
      <h1 className="text-2xl container mx-auto text-center mb-10 text-gray-500">
        Welocome to{" "}
        <span className="text-red-400 font-semibold ">Journey Pack</span>
      </h1>
      {islogin ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <Signup toggleForm={toggleForm} />
      )}
    </section>
  );
};

export default Registration;
