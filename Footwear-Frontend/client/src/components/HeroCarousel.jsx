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
    ctaLink: "/products/cloud-flex-slip-ons",
    imageUrl:
      "https://amzon-metro-bucket.s3.ap-southeast-1.amazonaws.com/3ea018859205bf46bfa2e5553d0d6000-canvas.webp",
  },

  {
    id: 2,
    headline: "STEP INTO SAVINGS THIS WEEKEND!",
    subtext: "Limited Time Offer",
    product: "The Clearance Collection",
    promo: "UP TO 40% OFF:",
    promoCode: "WEEKEND40",
    ctaText: "SHOP THE SALE",
    ctaLink: "/collections/sale",
    imageUrl:
      "https://amzon-metro-bucket.s3.ap-southeast-1.amazonaws.com/4c08b9bfb2a9b49ba5b4001e4c456529-nike.jpeg",
  },

  {
    id: 3,
    headline: "UNLEASH YOUR BEST RUN YET.",
    subtext: "Featuring revolutionary",
    product: "Aero-Lite Trainers 🏃",
    promo: "CARBON FIBER PLATE:",
    promoCode: "ULTRAFAST",
    ctaText: "EXPLORE TRAINERS",
    ctaLink: "/products/aero-lite-trainer",
    imageUrl:
      "https://amzon-metro-bucket.s3.ap-southeast-1.amazonaws.com/906a75159327bd1e22aa171653d7194b-paragonhawai.webp",
  },

  {
    id: 4,
    headline: "WALK LIGHTER ON THE PLANET.",
    subtext: "Made from recycled materials",
    product: "Eco-Weave Casuals 🌱",
    promo: "100% VEGAN LEATHER:",
    promoCode: "GOECO",
    ctaText: "DISCOVER SUSTAINABLE",
    ctaLink: "/collections/sustainable",
    imageUrl: "path/to/your/eco-shoes-image.jpg",
  },

  {
    id: 5,
    headline: "FALL TRENDS ARE FINALLY HERE.",
    subtext: "Introducing the new",
    product: "Heritage Leather Boots",
    promo: "LIMITED EDITION STYLES:",
    promoCode: "NEWFALL23",
    ctaText: "SHOP NEW ARRIVALS",
    ctaLink: "/collections/new-fall",
    imageUrl: "path/to/your/boots-image.jpg",
  },

  {
    id: 6,
    headline: "BUILT TO LAST. DESIGNED TO STUN.",
    subtext: "Guaranteed waterproof",
    product: "Adventure Hiker Pro ⛰️",
    promo: "2-YEAR WARRANTY:",
    promoCode: "PROTECT",
    ctaText: "VIEW DETAILS",
    ctaLink: "/products/adventure-hiker-pro",
    imageUrl: "path/to/your/hiker-boot-image.jpg",
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
