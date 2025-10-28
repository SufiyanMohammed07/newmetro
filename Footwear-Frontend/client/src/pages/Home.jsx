import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import ProductCard from "../components/ProductCard";
import HeroCarousel from "../components/HeroCarousel";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [logoutMessage, setLogoutMessage] = useState("");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  

useEffect(() => {
  const message = localStorage.getItem("logoutMessage");
  if (message) {
    setLogoutMessage(message);

    localStorage.removeItem("logoutMessage");

    const timer = setTimeout(() => {
      setLogoutMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }
}, []);


  return (
    <>
    {logoutMessage && (
  <div
    style={{
      background: "#25D366",
      color: "white",
      padding: "10px 20px",
      borderRadius: "8px",
      textAlign: "center",
      margin: "20px auto",
      maxWidth: "500px",
      fontSize: "18px",
      fontWeight: "500",
      opacity: logoutMessage ? 1 : 0,
      transition: "opacity 0.5s ease-in-out",
    }}
  >
    {logoutMessage}
  </div>
)}
    
    <div style={{ padding: "40px" }}>
      <HeroCarousel/>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Our Footwear Collection</h2>
        <div className="product-grid-container">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
    </div>
    </>
  );
};

export default Home;
