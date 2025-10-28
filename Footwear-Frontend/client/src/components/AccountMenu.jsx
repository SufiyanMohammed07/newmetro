import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Navbar.module.css"; 
import { HiOutlineUser } from "react-icons/hi2";

const AccountMenu = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  // const[message,setMessage]=useState("");
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowMenu(false);
    // setTimeout(()=>navigate("/"),1500);
     localStorage.setItem("logoutMessage", "Successfully Logged Out! Come Back Again!!");
     setTimeout(() => navigate("/"), 300);
  };

  return (
    <div className={styles.navRightUtility} ref={menuRef}>
    
      <button
  className={styles.utilityIconLink}
  title="Account"
  onClick={() => setShowMenu(!showMenu)}
>
  <HiOutlineUser size={26} />
</button>

      {showMenu && (
        <div className={styles.accountDropdown}>
          {isLoggedIn ? (
            <>
              <Link
                to="/account-details"
                className={styles.dropdownItem}
                onClick={() => setShowMenu(false)}
              >
                Update Account
              </Link>

              <button onClick={handleLogout} className={styles.dropdownItem}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.dropdownItem}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button className={styles.dropdownItem} disabled>
                Update Account
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
