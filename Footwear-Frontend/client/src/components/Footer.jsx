import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn,FaCcAmex, FaCcPaypal, FaCcVisa, FaCcMastercard,FaCcDiscover, 
  FaApplePay  } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column logo-section">
          <h2 className="footer-logo">Metro</h2>
          <p className="footer-tagline">
            Step into comfort and style with Metro — crafted for every step you take.
          </p>
        </div>

        <div className="footer-column">
          <h4>Shop</h4>
          <ul>
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>New Arrivals</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Help</h4>
          <ul>
            <li>FAQs</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Order Tracking</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="footer-socials">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">

<div className="footer-payment-logos">
  <FaCcAmex className="payment-logo" style={{ color: "#2E77BC" }} />      
  <FaCcPaypal className="payment-logo" style={{ color: "#003087" }} />      
  <FaCcVisa className="payment-logo" style={{ color: "#1A1F71" }} />       
  <FaCcMastercard className="payment-logo" style={{ color: "#EB001B" }} />  
  <FaCcDiscover className="payment-logo" style={{ color: "#FF6000" }} />    
  <FaApplePay className="payment-logo" style={{ color: "#000000" }} />       
</div>

        <p>© 2025 Metro Footwear. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
