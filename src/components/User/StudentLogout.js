import { useEffect } from "react";
import api from "../../utils/api"; // JWT interceptor instance

function StudentLogout() {
  useEffect(() => {
    const logout = async () => {
      try {
        // Optional: Notify backend to blacklist refresh token
        const refresh = localStorage.getItem("refresh");
        if (refresh) {
          await api.post("auth/logout/", { refresh });
        }
      } catch (error) {
        console.warn("Logout token invalid or already expired:", error);
      } finally {
        // Clear all authentication data
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("student");
        localStorage.removeItem("role");
        localStorage.removeItem("studentLoginStatus");

        //  Redirect to login page
        setTimeout(() => {
          window.location.href = "/user-login";
        }, 1000);
      }
    };

    logout();
  }, []);

  //Optional logout animation / feedback
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
      }}
    >
      <div className="text-center">
        <div
          className="spinner-border text-primary mb-3"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        ></div>
        <h5 className="text-dark fw-semibold">Logging you out...</h5>
        <p className="text-muted small">
          Please wait while we securely end your session.
        </p>
      </div>
    </div>
  );
}

export default StudentLogout;
