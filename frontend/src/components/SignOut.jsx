import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SignOut = ({ setToken }) => {
  // const [token, setToken] = useState(null);
  const navigate = useNavigate();

  function signoutftn() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setToken(null);

    toast.success("Logout successfully!");
    navigate("/login");
  }

  useEffect(() => {
    signoutftn();
  }, []);

  return <div>SignOut</div>;
};

export default SignOut;
