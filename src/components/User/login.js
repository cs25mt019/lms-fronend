import React, { useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:8000/api/";

function Login() {

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submitLogin = () => {
    axios.post(`${baseURL}student/login/`, loginData)
      .then((res) => {
        if (res.data.bool === true) {
          localStorage.setItem("studentLoginStatus", "true");
          localStorage.setItem("student", JSON.stringify(res.data.student));
          window.location.href = "/user-dashboard"; // redirect
        } else {
          setError("Invalid username or password");
        }
      })
      .catch(() => {
        setError("Server error, try again");
      });
  };

  return (
    <div className="container mt-5 col-md-4">
      <h3 className="mb-3">Student Login</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} className="form-control" />
      </div>

      <button className="btn btn-success" onClick={submitLogin}>Login</button>
    </div>
  );
}

export default Login;
