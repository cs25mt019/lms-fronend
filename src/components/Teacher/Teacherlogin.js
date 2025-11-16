import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

function TeacherLogin() {
  const [teacherData, setTeacherData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}auth/teacher/login/`, teacherData);

      if (res.data?.access && res.data?.refresh) {
        const teacherObj = res.data.user;

        // Save tokens
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        // Save teacher full object & ID separately
        localStorage.setItem("teacher", JSON.stringify(teacherObj));
        localStorage.setItem("teacherId", teacherObj.id); // ⭐ REQUIRED FIX ⭐

        // Additional data
        localStorage.setItem("role", "teacher");
        localStorage.setItem("teacherLoginStatus", "true");

        // Redirect
        window.location.href = "/teacher-dashboard";
      } else {
        setError("Login failed. Invalid server response.");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Teacher Login";
    const isLoggedIn = localStorage.getItem("teacherLoginStatus");
    if (isLoggedIn === "true") {
      window.location.href = "/teacher-dashboard";
    }
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #fff7e6 0%, #ffefcc 40%, #fff2d1 100%)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "420px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="text-center mb-3">
          <h4 className="fw-bold text-dark">Welcome Teacher</h4>
          <p className="text-muted small">
            Log in to manage your courses and students
          </p>
        </div>

        {error && (
          <div className="alert alert-danger text-center rounded-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label className="fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control rounded-3"
              placeholder="Enter your email"
              value={teacherData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control rounded-3"
              placeholder="Enter your password"
              value={teacherData.password}
              onChange={handleChange}
              required
            />
          </div>
        <div className="text-end mb-3">
  <a href="/forgot-password" className="small text-primary fw-semibold">
    Forgot Password?
  </a>
</div>

          <button
            type="submit"
            className="btn w-100 py-2 rounded-4 fw-bold text-white"
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #ffb347 0%, #ffcc33 100%)",
              border: "none",
              transition: "0.3s",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0 small">
          Don’t have an account?{" "}
          <a href="/teacher-register" className="fw-bold text-warning">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default TeacherLogin;
