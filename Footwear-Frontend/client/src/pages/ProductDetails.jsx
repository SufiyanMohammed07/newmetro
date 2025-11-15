import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Slider from "react-slick";
import { FaWhatsapp } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const whatsappNumber = "919573800201";
  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    if (isLoggedIn) {
      const fetchProduct = async () => {
        try {
          const res = await axiosInstance.get(`/products/${id}`);
          setProduct(res.data);
        } catch (err) {
          console.error("Error fetching product:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [id, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="login-warning">
        <h2>Please log in to view product details</h2>
        <p>You must be signed in to see this product’s full details.</p>
        <button onClick={() => navigate("/login")} className="login-btn">
          Go to Login
        </button>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  const handleWhatsAppContact = () => {
    const msg = `👟 Hi! I'm interested in ${product.name} (₹${product.price}).`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  const sizeOptions = {
    "school-shoes": [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
    ],
    "sports-shoes": ["6", "7", "8", "9", "10", "11"],
    "formal-shoes": ["6", "7", "8", "9", "10", "11"],
    sandals: ["5", "6", "7", "8", "9", "10"],
  };

  const sizes = sizeOptions[product.category?.toLowerCase()] || [];

  return (
    <div className="product-details-container">
      <div className="product-wrapper">
        <div className="product-images">
          {product.images && product.images.length > 0 ? (
            <Slider {...sliderSettings}>
              {product.images.map((imgUrl, index) => (
                <div key={index} className="slider-image-wrapper">
                  {/* <img
                    src={imgUrl}
                    alt={`${product.name}-${index}`}
                    className="product-image"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  /> */}
                  <img
                    src={imgUrl}
                    alt={`${product.name}-${index}`}
                    className="product-image"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src="/placeholder.jpg"
              alt="No image available"
              className="product-image"
            />
          )}
        </div>

        <div className="product-info">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-category">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="product-price">
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p className="product-description">
            {product.description || "No description available."}
          </p>

          {/* <div className="product-sizes">
            <h4>Available Sizes</h4>
            <br />
            <div className="size-options">
  {sizes.map((size, index) => (
    <div key={`${size}-${index}`} className="size-box">
      {size}
    </div>
  ))}
</div>

          </div> */}

          {sizes.length > 0 && (
            <div className="product-sizes">
              <h4>Available Sizes</h4>
              <br />
              <div className="size-options">
                {sizes.map((size, index) => (
                  <div key={`${size}-${index}`} className="size-box">
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}
          <button onClick={handleWhatsAppContact} className="whatsapp-button">
            <FaWhatsapp size={20} style={{ marginRight: "8px" }} />
            Contact on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
