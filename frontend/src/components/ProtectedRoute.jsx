import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    toast.warn("You need to be logged in to access this page");
    return <Navigate to="/login" />;
  }

  return Component;
};

export default ProtectedRoute;
