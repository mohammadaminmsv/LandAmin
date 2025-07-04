import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../hooks/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return isLoggedIn ? children : <Navigate to="/HomePage" />;
};

export default ProtectedRoute;