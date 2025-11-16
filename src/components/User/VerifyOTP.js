import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

function VerifyOTP() {
  const email = localStorage.getItem("reset_email");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState("verify");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${BASE_URL}auth/verify-reset-otp/`, {
        email,
        otp,
      });

      setStep("reset");
    } catch (err) {
      setMessage("Invalid or expired OTP.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${BASE_URL}auth/reset-password/`, {
        email,
        otp,
        new_password: newPassword,
      });

      localStorage.removeItem("reset_email");

      alert("Password reset successful!");
      window.location.href = "/user-login";
    } catch (err) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h4 className="text-center mb-3">Verify OTP</h4>

        {message && <div className="alert alert-danger text-center">{message}</div>}

        {step === "verify" ? (
          <form onSubmit={handleVerify}>
            <p className="text-muted small">OTP sent to: <b>{email}</b></p>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
            />

            <button className="btn btn-primary w-100">Verify OTP</button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <button className="btn btn-success w-100">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default VerifyOTP;
