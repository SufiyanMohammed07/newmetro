import React, { useState, useEffect } from "react";
import axios from "axios";

function AccountDetails() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        name: storedUser.name,
        email: storedUser.email,
        phone: storedUser.phone || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // for auth
      const res = await axios.put(
        `http://localhost:3030/api/auth/${user._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data); 
      localStorage.setItem("user", JSON.stringify(res.data)); 
      setMessage("Account updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Update failed");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="account-details">
      <h2>Account Details</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Account</button>
      </form>
    </div>
  );
}

export default AccountDetails;
