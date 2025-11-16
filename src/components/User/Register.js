import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

function Register() {
  const [student, setStudent] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
    interests: "",
  });

  const [status, setStatus] = useState(""); // success | error
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setErrorMsg("");

    try {
      const res = await axios.post(`${BASE_URL}auth/student/register/`, {
        full_name: student.full_name,
        email: student.email,
        username: student.username,
        password: student.password,
        interested_categories: student.interests,
      });

      if (res.data?.msg === "Student registered successfully") {
        setStatus("success");

        // Auto-login after registration (optional)
        try {
          const loginRes = await axios.post(`${BASE_URL}auth/student/login/`, {
            username: student.username,
            password: student.password,
          });

          if (loginRes.data?.access && loginRes.data?.refresh) {
            localStorage.setItem("access", loginRes.data.access);
            localStorage.setItem("refresh", loginRes.data.refresh);
            localStorage.setItem("student", JSON.stringify(loginRes.data.user));
            localStorage.setItem("role", "student");
            localStorage.setItem("studentLoginStatus", "true");
            window.location.href = "/user-dashboard";
          }
        } catch (loginError) {
          console.warn("Auto-login failed, manual login required.", loginError);
        }

        // Reset form
        setStudent({
          full_name: "",
          email: "",
          username: "",
          password: "",
          interests: "",
        });
      } else {
        setStatus("error");
        setErrorMsg(res.data?.error || "Unexpected response from server.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setStatus("error");
      if (error.response?.data?.error) {
        setErrorMsg(error.response.data.error);
      } else if (error.response?.data?.detail) {
        setErrorMsg(error.response.data.detail);
      } else {
        setErrorMsg("Registration failed. Please check your details.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Student Register";
    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus === "true") {
      window.location.href = "/user-dashboard";
    }
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f9f9f9 0%, #f1f4ff 40%, #e8f0ff 100%)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "450px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="text-center mb-3">
          <h4 className="fw-bold text-dark">Create Your Account</h4>
          <p className="text-muted small">
            Join SpringBoard and start your learning journey 🚀
          </p>
        </div>

        {/* Success / Error messages */}
        {status === "success" && (
          <div className="alert alert-success text-center rounded-3 py-2">
            🎉 Registration successful! Redirecting to dashboard...
          </div>
        )}
        {status === "error" && (
          <div className="alert alert-danger text-center rounded-3 py-2">
            {errorMsg}
          </div>
        )}

        <form onSubmit={submitForm}>
          <div className="form-group mb-3">
            <label className="fw-semibold">Full Name</label>
            <input
              type="text"
              name="full_name"
              className="form-control rounded-3"
              placeholder="Enter your full name"
              value={student.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control rounded-3"
              placeholder="Enter your email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="fw-semibold">Username</label>
            <input
              type="text"
              name="username"
              className="form-control rounded-3"
              placeholder="Choose a username"
              value={student.username}
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
              placeholder="Enter a strong password"
              value={student.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="fw-semibold">Interests</label>
            <textarea
              name="interests"
              rows="3"
              className="form-control rounded-3"
              placeholder="E.g. Machine Learning, Web Development"
              value={student.interests}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn w-100 py-2 rounded-4 fw-bold text-white"
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #007bff 0%, #00b4d8 100%)",
              border: "none",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0 small">
          Already have an account?{" "}
          <a href="/user-login" className="fw-bold text-primary">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
