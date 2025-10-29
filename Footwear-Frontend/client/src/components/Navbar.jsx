import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import AccountMenu from "./AccountMenu";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   setIsLoggedIn(false);
  //   window.location.reload();
  //   navigate("/");
  // };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const getLinkClass = (path) =>
    location.pathname === path ? styles.active : "";

  return (
    <>
      <div
        id="top-alert-bar"
        style={{
          backgroundColor: "bisque",
          color: "black",
          textAlign: "center",
          padding: "10px 20px",
          fontSize: "16px",
          width: "100%",
          boxSizing: "border-box",
          margin: 0,
        }}
      >
        <p>Closure Sale ends today ✨</p>
        <div className="logo">Buy 2 - Get 10% | Buy 4 - Get 25%</div>
      </div>

      <header className={styles.header}>
        <div className={styles.navTop}>
          <div className={styles.navLeftUtility}>
            <div className={styles.menuToggle} onClick={toggleMenu}>
              {isMenuOpen ? "✕" : "☰"}
            </div>

            <span className={styles.searchIcon} title="Search">
              🔍
            </span>
          </div>

          <div className={styles.logoContainer}>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleLinkClick}
            >
              <div className={styles.logoTitle}>METRO</div>
              <div className={styles.logoSubtitle}>MELBOURNE</div>
            </Link>
          </div>

          <div className={styles.navRightUtility}>
            <AccountMenu
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />

            <Link to="/" className={styles.utilityIconLink} title="Cart">
              🛒
            </Link>
          </div>
        </div>

        <div className={styles.mainLinksContainer}>
          <ul
            className={`${styles.mainLinks} ${isMenuOpen ? styles.open : ""}`}
          >
            <li>
              <Link
                to="/"
                className={getLinkClass("/")}
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={getLinkClass("/for-her")}
                onClick={handleLinkClick}
              >
                For Her
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={getLinkClass("/for-him")}
                onClick={handleLinkClick}
              >
                For Him
              </Link>
            </li>
            <li>
             
 <Link
    to="#"
    className={getLinkClass("/track-order")}
    onClick={(e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Please log in to track your order!");
        navigate("/login");
      } else {
        const user = JSON.parse(localStorage.getItem("user"));
        const name = user?.name || "User";
        const phone = user?.phone || "Not Provided";

        const message = `Hi, I want to track my order. My details are:\n\n 👤 Name: ${name}\n 📞 Phone: ${phone}`;

        const whatsappUrl = `https://wa.me/919573800201?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, "_blank");
      }

      handleLinkClick();
    }}
  >
    Track Your Order
  </Link>
            </li>

            <li>
              <a
                href="https://wa.me/919573800201?text=Hi%20I%20want%20to%20know%20more%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className={getLinkClass("/contact")}
                onClick={handleLinkClick}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
