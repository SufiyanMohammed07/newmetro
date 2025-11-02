// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Welcome back to New Metro!");

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);

    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to Your Account</h2>
      {message && (
        <p style={{ color: message.includes("Welcome") ? "green" : "red" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      <div className="auth-links">
        <p>
          New user? <Link to="/register">Create an account</Link>
        </p>
        {/* <p>
          Or <Link to="/login-phone">Continue with phone Number</Link>
        </p> */}
      </div>
    </div>
  );
}

export default Login;
