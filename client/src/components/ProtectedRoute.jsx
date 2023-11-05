import React from "react";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ element, role }) {
  const loggedIn = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");

  if (loggedIn && userRole !== role) {
    return <Navigate to="/login" />;
  }
  return element;
}

export default ProtectedRoute;
