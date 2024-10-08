import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import backgroundImage from "../assets/nellie-adamyan-DQLEFBUHiVs-unsplash.jpg";
import { toast } from "react-toastify";
import axios from "axios";
// import { URL } from "../utils/MyLocalURL";
import { motion } from "framer-motion";

const Login = ({ setToken }) => {
  const URL = import.meta.env.VITE_APP_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email,
        password,
      };
      const { data } = await axios.post(`${URL}/api/v1/auth/login`, newUser);
      toast.success("Login successfully!");
      localStorage.setItem("token", data.token);
      setToken(localStorage.getItem("token"));
      localStorage.setItem("email", data.email);
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("isAdmin", data.isAdmin);
      handleReset();
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // useEffect(() => {
  // }, [handleLogin]);

  return (
    <motion.div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <motion.div>
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-white text-left text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-1 p-2 w-full border rounded outline-none text-black bg-cyan-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-left text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 p-2 w-full border rounded outline-none text-black bg-cyan-50"
            />
          </div>
          <motion.button
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="w-full bg-yellow-300 text-black p-2 rounded mt-4 font-bold hover:bg-orange-400"
          >
            Login
          </motion.button>
        </form>
        <p className="text-center text-white mt-4 text-sm">
          Do not have an account?
          <Link to="/signup" className="text-white  pl-2 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
