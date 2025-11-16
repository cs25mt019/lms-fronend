import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}auth/student/login/`, {
        username: loginData.username.trim(),
        password: loginData.password,
      });

      if (res.data?.access && res.data?.refresh) {
        //  Save tokens + user info
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        localStorage.setItem("student", JSON.stringify(res.data.user));
        localStorage.setItem("role", "student");
        localStorage.setItem("studentLoginStatus", "true");

        // Redirect
        window.location.href = "/user-dashboard";
      } else {
        setError("Invalid server response. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (err.response?.status === 401) {
        setError("Invalid username or password.");
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    const loginStatus = localStorage.getItem("studentLoginStatus");
    if (loginStatus === "true") {
      window.location.href = "/user-dashboard";
    }
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "85vh",
        background:
          "linear-gradient(135deg, #f9f9f9 0%, #f1f4ff 40%, #e8f0ff 100%)",
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
          <h4 className="fw-bold text-dark">Welcome Back </h4>
          <p className="text-muted small">
            Log in to continue your learning journey
          </p>
        </div>

        {error && (
          <div className="alert alert-danger text-center rounded-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label className="fw-semibold">Username</label>
            <input
              type="text"
              name="username"
              className="form-control rounded-3"
              placeholder="Enter your username"
              value={loginData.username}
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
              value={loginData.password}
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
              background: "linear-gradient(135deg, #007bff 0%, #00b4d8 100%)",
              border: "none",
              transition: "0.3s",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0 small">
          Don’t have an account?{" "}
          <a href="/user-register" className="fw-bold text-primary">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
