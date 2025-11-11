import React, { useState } from "react";
import "./Carousel.css";

const slidesData = [
  {
    id: 1,
    headline: "COMFORT THAT FEELS LIKE PLAYTIME!",
    subtext: "Presenting",
    product: "Cloud Flex Slip Ons",
    promo: "EXTRA 10% OFF:",
    promoCode: "NEWCF510",
    ctaText: "GET A PAIR NOW",
    ctaLink: "/product/690ca169482f1721627553b1",
    imageUrl:
      "https://amzon-metro-bucket.s3.ap-southeast-1.amazonaws.com/496d6f195071ac0e2e9b916d80c50395-20251106_184211.jpg",
  },

  {
    id: 2,
    headline: "STEP INTO SAVINGS THIS WEEKEND!",
    subtext: "Limited Time Offer",
    product: "The Clearance Collection",
    promo: "UP TO 40% OFF:",
    promoCode: "WEEKEND40",
    ctaText: "SHOP THE SALE",
    ctaLink: "/product/690b5071482f1721627552fe",
    imageUrl:
      "https://amzon-metro-bucket.s3.ap-southeast-1.amazonaws.com/149b5d9c4b666509d3c00b8487da1912-20251105_184615.jpg",
  },

  {
    id: 3,
    headline: "UNLEASH YOUR BEST RUN YET.",
    subtext: "Featuring revolutionary",
    product: "Aero-Lite Trainers 🏃",
    promo: "CARBON FIBER PLATE:",
    promoCode: "ULTRAFAST",
    ctaText: "EXPLORE TRAINERS",
    ctaLink: "/product/690c9b75482f17216275538e",
    imageUrl:
      "https://amzon-metro-bucket.s3.ap-southeast-1.amazonaws.com/dbf71b3ad59cd571371be83bd3f7afa7-20251106_181222.jpg",
  },

  {
    id: 4,
    headline: "WALK LIGHTER ON THE PLANET.",
    subtext: "Made from recycled materials",
    product: "Eco-Weave Casuals 🌱",
    promo: "100% VEGAN LEATHER:",
    promoCode: "GOECO",
    ctaText: "DISCOVER SUSTAINABLE",
    ctaLink: "/product/690c8e17482f172162755378",
    imageUrl: "https://amzon-metro-bucket.s3.ap-southeast-1.amazonaws.com/95392ed4901b074df26653c31e55e302-20251106_172232.jpg",
  },

  {
    id: 5,
    headline: "FALL TRENDS ARE FINALLY HERE.",
    subtext: "Introducing the new",
    product: "Red Apple Leather Formal Shoes",
    promo: "LIMITED EDITION STYLES:",
    promoCode: "NEWFALL23",
    ctaText: "SHOP NEW ARRIVALS",
    ctaLink: "/product/690c99d7482f172162755382",
    imageUrl: "https://amzon-metro-bucket.s3.ap-southeast-1.amazonaws.com/2280b4e067025db81ea20daa6eecaaf5-20251106_181335.jpg",
  },

  {
    id: 6,
    headline: "BUILT TO LAST. DESIGNED TO STUN.",
    subtext: "Guaranteed Product",
    product: "Party Wear ⛰️",
    promo: "1-YEAR WARRANTY:",
    promoCode: "PROTECT",
    ctaText: "VIEW DETAILS",
    ctaLink: "/product/690c8d0b482f172162755370",
    imageUrl: "https://amzon-metro-bucket.s3.ap-southeast-1.amazonaws.com/0cf10c8a81dd0d3fbce9c3842303a6d1-20251106_171007.jpg",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slidesData.length;

  const nextSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex + 1) % totalSlides);
  };
  const prevSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const currentSlideData = slidesData[currentSlide];

  return (
    <div className="hero-carousel-container">
      <a  
        href={currentSlideData.ctaLink}
        className="hero-carousel-slide"
        aria-label={`Shop the ${currentSlideData.product} collection`}
      >
     

        <div className="hero-content-wrapper">
          <p className="hero-subtext">{currentSlideData.subtext}</p>
          <h2 className="hero-headline">
            {currentSlideData.headline.split(" ").map((word, index) => (
              <React.Fragment key={index}>
                {word}
                {index === 2 && <br />}
                {index !== currentSlideData.headline.split(" ").length - 1 &&
                  " "}
              </React.Fragment>
            ))}
          </h2>
          <p className="product-name">{currentSlideData.product}</p>

          <div className="promo-box">
            {currentSlideData.promo}{" "}
            <strong>{currentSlideData.promoCode}</strong>
          </div>

          <button className="cta-button desktop-cta">
            {currentSlideData.ctaText}
          </button>
        </div>

        <img
          src={currentSlideData.imageUrl}
          alt={`Featured ${currentSlideData.product}`}
          className="hero-product-image"
        />
      </a>

      <button
        className="carousel-arrow left-arrow"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        &#10094;
      </button>
      <button
        className="carousel-arrow right-arrow"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        &#10095;
      </button>

      <div className="carousel-nav-dots">
        {slidesData.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
