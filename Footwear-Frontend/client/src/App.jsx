import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountDetails from "./pages/AccountDetails";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
// import Phone from "./pages/Phone";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/login-phone" element={<Phone/>}/> */}
        <Route path="/account-details" element={<AccountDetails />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
         <Footer />
          <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    
    </Router>
  );
};

export default App;
