import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Productcards.css"; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const images = product?.images || [];
  const firstImage = product.images?.[0] || "";

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };
    const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1200,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  return (
    <div className="product-card" onClick={handleCardClick}   
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="product-img-wrapper">
        {isHovered && images.length > 1 ? (
          <Slider {...sliderSettings}>
            {images.map((img, index) => (
              <div key={index} className="product-img-slide">
                <img src={img} alt={`${product.name}-${index}`} className="product-img" />
              </div>
            ))}
          </Slider>
        ) : (
          <img src={firstImage} alt={product.name} className="product-img" />
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}/-</p>
      </div>
    </div>
  );
};

export default ProductCard;

