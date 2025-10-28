import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";  
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };
  

  return (
    <div className="product-grid">
      {products.map((product) => {
        const firstImage = product.images?.[0] || "";
        return (
          <div
            key={product._id}
            className="product-card"
            onClick={() => handleCardClick(product._id)}
          >
            <img
              src={firstImage}
              alt={product.name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h3>{product.name}</h3>
              <p style={{ color: "gray" }}>{product.category}</p>
              <p>
                <strong>₹{product.price}</strong>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;