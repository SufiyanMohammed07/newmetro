// import React from "react";
// import "./Footer.css";
// import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn,FaCcAmex, FaCcPaypal, FaCcVisa, FaCcMastercard,FaCcDiscover, 
//   FaApplePay  } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-column logo-section">
//           <h2 className="footer-logo">Metro</h2>
//           <p className="footer-tagline">
//             Step into comfort and style with Metro — crafted for every step you take.
//           </p>
//         </div>

//         <div className="footer-column">
//           <h4>Shop</h4>
//           <ul>
//             <li>Men</li>
//             <li>Women</li>
//             <li>Kids</li>
//             <li>New Arrivals</li>
//           </ul>
//         </div>

//         <div className="footer-column">
//           <h4>Help</h4>
//           <ul>
//             <li>FAQs</li>
//             <li>Shipping</li>
//             <li>Returns</li>
//             <li>Order Tracking</li>
//           </ul>
//         </div>

//         <div className="footer-column">
//           <h4>Follow Us</h4>
//           <div className="footer-socials">
//             <a href="#"><FaInstagram /></a>
//             <a href="#"><FaFacebookF /></a>
//             <a href="#"><FaTwitter /></a>
//             <a href="#"><FaLinkedinIn /></a>
//           </div>
//         </div>
//       </div>
      
//       <div className="footer-bottom">

// <div className="footer-payment-logos">
//   <FaCcAmex className="payment-logo" style={{ color: "#2E77BC" }} />      
//   <FaCcPaypal className="payment-logo" style={{ color: "#003087" }} />      
//   <FaCcVisa className="payment-logo" style={{ color: "#1A1F71" }} />       
//   <FaCcMastercard className="payment-logo" style={{ color: "#EB001B" }} />  
//   <FaCcDiscover className="payment-logo" style={{ color: "#FF6000" }} />    
//   <FaApplePay className="payment-logo" style={{ color: "#000000" }} />       
// </div>

//         <p>© 2025 Metro Footwear. All Rights Reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaCcAmex,
  FaCcPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaCcDiscover,
  FaApplePay,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  // WhatsApp contact link
  const whatsappLink =
    "https://wa.me/919573800201?text=Hi%20I%20have%20a%20query%20regarding%20your%20products%20or%20services";

  // Instagram page (replace with your official link)
  const instagramLink = "https://www.instagram.com";

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-column logo-section">
          <h2 className="footer-logo">Metro</h2>
          <p className="footer-tagline">
            Step into comfort and style with Metro — crafted for every step you take.
          </p>
        </div>

        {/* Shop Section */}
        <div className="footer-column">
          <h4>Shop</h4>
          <ul>
            <li onClick={() => navigate("/category/for-him")}>Men</li>
            <li onClick={() => navigate("/category/for-her")}>Women</li>
            <li onClick={() => navigate("/category/kids")}>Kids</li>
            <li onClick={() => navigate("/category/new-arrivals")}>New Arrivals</li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="footer-column">
          <h4>Help</h4>
          <ul>
            <li>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                FAQs
              </a>
            </li>
            <li>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Shipping
              </a>
            </li>
            <li>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Returns
              </a>
            </li>
            <li>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Order Tracking
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="footer-socials">
            <a href={instagramLink} target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Payment Logos */}
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
