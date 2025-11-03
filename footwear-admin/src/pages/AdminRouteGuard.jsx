import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AdminRouteGuard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const verifyAdmin = async () => {
      try {
        await axiosInstance.get("/auth/verify-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Admin verification failed:", error.response?.data?.msg);
        localStorage.removeItem("token"); // Cleanup bad token
        setIsAuthenticated(false);
        console.log("token");

      }
    };

    verifyAdmin();
  }, [token]);

  if (isAuthenticated === null) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        Checking Admin Access...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRouteGuard;
