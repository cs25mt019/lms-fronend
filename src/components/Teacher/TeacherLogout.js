import { useEffect } from "react";

function TeacherLogout() {
  useEffect(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("teacher");
    localStorage.removeItem("role");
    localStorage.removeItem("teacherLoginStatus");

    window.location.href = "/teacher-login";
  }, []);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#fff7e6" }}
    >
      <div className="text-center">
        <div
          className="spinner-border text-warning mb-3"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        ></div>
        <h5 className="text-dark">Logging you out...</h5>
        <p className="text-muted small">Please wait a moment.</p>
      </div>
    </div>
  );
}

export default TeacherLogout;
