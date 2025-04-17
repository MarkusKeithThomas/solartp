import { JSX } from "react";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("admin-auth") === "true";
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default RequireAdmin;