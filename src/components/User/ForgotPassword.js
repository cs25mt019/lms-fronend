import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${BASE_URL}auth/request-reset-otp/`, {
        email,
      });

      setMessage(res.data.message);
      localStorage.setItem("reset_email", email);

      window.location.href = "/verify-otp";
    } catch (err) {
      setMessage("Error sending OTP. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h4 className="text-center mb-3">Forgot Password</h4>
        <p className="text-muted small text-center">Enter your registered email to continue.</p>

        {message && <div className="alert alert-info text-center">{message}</div>}

        <form onSubmit={handleSendOTP}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
