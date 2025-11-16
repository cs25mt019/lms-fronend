import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("access");
      const role = localStorage.getItem("role");
      
      if (!accessToken || !role) {
        setIsAuth(false);
        setChecking(false);
        return;
      }

      // Optional: Validate token by making a test API call
      try {
        // You could make a simple API call here to validate the token
        setIsAuth(true);
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.clear();
        setIsAuth(false);
      }
      
      setChecking(false);
    };

    checkAuth();
  }, []);

  if (checking) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return isAuth ? children : <Navigate to="/user-login" />;
};

export default ProtectedRoute;