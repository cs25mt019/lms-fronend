import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

function TeacherRegister() {
  const [teacher, setTeacher] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    profile_image: null,
  });

  const [status, setStatus] = useState(""); // "success" | "error"
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle input text
  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleFileChange = (e) => {
    setTeacher({ ...teacher, profile_image: e.target.files[0] });
  };

  // Submit registration form
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setErrorMsg("");

    const formData = new FormData();
    for (const key in teacher) {
      if (teacher[key]) {
        formData.append(key, teacher[key]);
      }
    }

    try {
      const res = await axios.post(`${BASE_URL}auth/teacher/register/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.msg === "Teacher registered successfully") {
        setStatus("success");
//Auto login immediately after registration
        try {
          const loginRes = await axios.post(`${BASE_URL}auth/teacher/login/`, {
            email: teacher.email,
            password: teacher.password,
          });

          if (loginRes.data?.access && loginRes.data?.refresh) {
            localStorage.setItem("access", loginRes.data.access);
            localStorage.setItem("refresh", loginRes.data.refresh);
            localStorage.setItem("teacher", JSON.stringify(loginRes.data.user));
            localStorage.setItem("role", "teacher");
            localStorage.setItem("teacherLoginStatus", "true");
            window.location.href = "/teacher-dashboard";
          }
        } catch (loginError) {
          console.warn("Auto-login failed after registration", loginError);
        }

        // Reset form
        setTeacher({
          full_name: "",
          email: "",
          password: "",
          qualification: "",
          mobile_no: "",
          skills: "",
          profile_image: null,
        });
      } else {
        setStatus("error");
        setErrorMsg(res.data?.error || "Unexpected response from server.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setStatus("error");
      if (err.response?.data?.error) {
        setErrorMsg(err.response.data.error);
      } else if (err.response?.data?.detail) {
        setErrorMsg(err.response.data.detail);
      } else {
        setErrorMsg("Registration failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    document.title = "Teacher Register";
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
        background: "linear-gradient(135deg, #fff7e6 0%, #ffefcc 40%, #fff2d1 100%)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "480px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="text-center mb-3">
          <h4 className="fw-bold text-dark">Join as a Teacher</h4>
          <p className="text-muted small">
            Share your knowledge and inspire students worldwide.
          </p>
        </div>

        {/* Success / Error Alerts */}
        {status === "success" && (
          <div className="alert alert-success text-center rounded-3 py-2">
            🎉 Registration successful! Redirecting to your dashboard...
          </div>
        )}
        {status === "error" && (
          <div className="alert alert-danger text-center rounded-3 py-2">
            {errorMsg || "Registration failed. Please check your details."}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitForm}>
          {[
            { name: "full_name", label: "Full Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
            { name: "qualification", label: "Qualification", type: "text" },
            { name: "mobile_no", label: "Mobile Number", type: "text" },
          ].map((field, i) => (
            <div key={i} className="form-group mb-3">
              <label className="fw-semibold">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={teacher[field.name]}
                onChange={handleChange}
                className="form-control rounded-3"
                required
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
            </div>
          ))}

          <div className="form-group mb-3">
            <label className="fw-semibold">Skills</label>
            <textarea
              name="skills"
              value={teacher.skills}
              onChange={handleChange}
              className="form-control rounded-3"
              placeholder="e.g. Python, Django, AI"
              rows="2"
              required
            ></textarea>
          </div>

          <div className="form-group mb-3">
            <label className="fw-semibold">Profile Image (optional)</label>
            <input
              type="file"
              name="profile_image"
              onChange={handleFileChange}
              className="form-control rounded-3"
            />
          </div>

          <button
            type="submit"
            className="btn w-100 py-2 rounded-4 fw-bold text-white"
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #ffb347 0%, #ffcc33 100%)",
              border: "none",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0 small">
          Already have an account?{" "}
          <a href="/teacher-login" className="fw-bold text-warning">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default TeacherRegister;
