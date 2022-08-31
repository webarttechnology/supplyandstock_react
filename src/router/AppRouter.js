import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../components/Home";
import Dashboard from "../pages/Dashboard";
import EditProfile from "../pages/EditProfile";
import Login from "../pages/Login";
import Logins from "../components/Logins"
import { ToastContainer } from "react-toastify";
import Enquiry from "../pages/Enquiry";

const AppRouter = () => {
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("isLoginCheck"))
  );
  console.log("isLogin",isLogin);
  return (
    <Router>
      {isLogin ? (<Header isLogin={isLogin} />):(<Header isLogin={isLogin} />)}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seller/login" element={<Login setIsLogin={setIsLogin}  />} />
        <Route path="/buyer/login" element={<Logins setIsLogin={setIsLogin}  />} />
        <Route path="/user-dashboard" element={<Dashboard setIsLogin={setIsLogin} />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/enquiry" element={<Enquiry />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default AppRouter;
