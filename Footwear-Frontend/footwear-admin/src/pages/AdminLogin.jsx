import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate,Link } from "react-router-dom";
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      if (!res.data.user.isAdmin) {
        setMsg("Access denied: Not an admin");
        return;
      }
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="admin-login-container" >

      <div className="admin-login-box">
        <h2>Metro Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <br />
          <p>
          Or <Link to="/login-phone">Continue with phone Number</Link>
        </p>
        </form>
        {msg && <p className="error-msg">{msg}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
