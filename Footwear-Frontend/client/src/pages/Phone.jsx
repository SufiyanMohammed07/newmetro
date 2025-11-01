import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Phone.css";
import axiosInstance from "../utils/axiosInstance"

const Phone = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loginMode, setLoginMode] = useState("password"); 
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!phone) return setMessage("Please enter your phone number.");
    try {
      const res = await axiosInstance.post("/otp/send-otp", { phone });
      if (res.status === 200) {
        setIsOtpSent(true);
        setMessage("OTP sent successfully!");
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error sending OTP.");
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) return setMessage("Please enter the OTP.");
    try {
      const res = await axiosInstance.post("/otp/verify-otp", { phone, code:otp });
      if (res.status === 200) {
         setMessage("OTP verified successfully!");
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || "Invalid or expired OTP.");
    }
  };

  // ✅ Login with phone and password
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!phone || !password) return setMessage("All fields are required.");
    try {
      const res = await axiosInstance.post("/api/login-phone", { phone, password });
      localStorage.setItem("token", res.data.token);
      navigate("/login-page");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Invalid credentials.");
    }
  };

  return (
    <div className="phone-login-container">
      <div className="phone-card">
        <h2>Login with Phone</h2>

        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* ✅ Choose Login Method */}
        <div className="toggle-mode">
          <button
            className={loginMode === "password" ? "active" : ""}
            onClick={() => setLoginMode("password")}
          >
            Use Password
          </button>
          <button
            className={loginMode === "otp" ? "active" : ""}
            onClick={() => setLoginMode("otp")}
          >
            Use OTP
          </button>
        </div>

        {loginMode === "password" ? (
          <form onSubmit={handlePasswordLogin}>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="primary-btn">
              Continue
            </button>
          </form>
        ) : (
          <div>
            {!isOtpSent ? (
              <button onClick={handleSendOtp} className="primary-btn">
                Send OTP
              </button>
            ) : (
              <>
                <div className="input-group">
                  <label>Enter OTP</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button onClick={handleVerifyOtp} className="primary-btn">
                  Verify & Continue
                </button>
              </>
            )}
          </div>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Phone;
