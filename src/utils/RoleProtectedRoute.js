import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RoleProtectedRoute = ({ children, roleRequired }) => {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (accessToken && role === roleRequired) {
      setAllowed(true);
    }

    setChecking(false);
  }, []);

  if (checking) {
    return <div>Loading...</div>;
  }

  return allowed ? children : <Navigate to="/user-login" />;
};

export default RoleProtectedRoute;
