// import React, { useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import ProductCard from "../components/ProductCard";
// import HeroCarousel from "../components/HeroCarousel";
// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [logoutMessage, setLogoutMessage] = useState("");


//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axiosInstance.get("/products");
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Failed to fetch products:", err);
//       }
//     };
//     fetchProducts();
//   }, []);

  

// useEffect(() => {
//   const message = localStorage.getItem("logoutMessage");
//   if (message) {
//     setLogoutMessage(message);

//     localStorage.removeItem("logoutMessage");

//     const timer = setTimeout(() => {
//       setLogoutMessage("");
//     }, 3000);

//     return () => clearTimeout(timer);
//   }
// }, []);


//   return (
//     <>
//     {logoutMessage && (
//   <div
//     style={{
//       background: "#25D366",
//       color: "white",
//       padding: "10px 20px",
//       borderRadius: "8px",
//       textAlign: "center",
//       margin: "20px auto",
//       maxWidth: "500px",
//       fontSize: "18px",
//       fontWeight: "500",
//       opacity: logoutMessage ? 1 : 0,
//       transition: "opacity 0.5s ease-in-out",
//     }}
//   >
//     {logoutMessage}
//   </div>
// )}
    
//     <div style={{ padding: "40px" }}>
//       <HeroCarousel/>
//       <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Our Footwear Collection</h2>
//         <div className="product-grid-container">
//       {products.map((product) => (
//         <ProductCard key={product._id} product={product} />
//       ))}
      

//     </div>
//     </div>
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import ProductCard from "../components/ProductCard";
import HeroCarousel from "../components/HeroCarousel";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (pageNum) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/products?page=${pageNum}`);
      if (pageNum === 1) {
        setProducts(res.data.products);
      } else {
        // Append the next 20 to the existing list
        setProducts((prev) => [...prev, ...res.data.products]);
      }
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handleNextPage = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
    }
  };

  useEffect(() => {
    const message = localStorage.getItem("logoutMessage");
    if (message) {
      setLogoutMessage(message);
      localStorage.removeItem("logoutMessage");

      const timer = setTimeout(() => setLogoutMessage(""), 3000);
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
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          {logoutMessage}
        </div>
      )}

      <div style={{ padding: "40px" }}>
        <HeroCarousel />
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Our Footwear Collection
        </h2>

        <div className="product-grid-container">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {loading && (
          <p style={{ textAlign: "center", color: "#777" }}>Loading...</p>
        )}

        {!loading && page < totalPages && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={handleNextPage}
              style={{
                background:"#ffe4c4",
                color: "black",
                padding: "12px 28px",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              <b>⬇️ Load More...</b> 
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
