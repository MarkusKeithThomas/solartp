import { JSX } from "react";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("admin-auth") === "true";
  return isAuthenticated ? children : <Navigate to="/login-admin" replace />;
};

export default RequireAdmin;