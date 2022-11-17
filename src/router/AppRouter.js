import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../components/Home";
import Dashboard from "../pages/Dashboard";
import EditProfile from "../pages/EditProfile";
import Login from "../pages/Login";
import Logins from "../components/Logins";
import { ToastContainer } from "react-toastify";
import Enquiry from "../pages/Enquiry";
import SignupBuyer from "../components/SignupBuyer";
import SignupSeller from "../pages/SignupSeller";
import Message from "../pages/Message";
import PaymentSuccuess from "../pages/paymentSuccuess";
import Order from "../pages/Order";
import OrderList from "../pages/orderList";

const AppRouter = () => {
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("isLoginCheck"))
  );
  const [totalNotification, setTotalNotification] = useState("");
  console.log("totalNotification", totalNotification);

  return (
    <Router>
      {isLogin ? (
        <Header isLogin={isLogin} totalNotification={totalNotification} />
      ) : (
        <Header isLogin={isLogin} totalNotification={totalNotification} />
      )}
      <ToastContainer />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/"
          element={<Login setIsLogin={setIsLogin} />}
        />
        <Route
          path="/seller/signup"
          element={<SignupSeller setIsLogin={setIsLogin} />}
        />
        <Route
          path="/buyer/login"
          element={<Logins setIsLogin={setIsLogin} />}
        />
        <Route
          path="/buyer/signup"
          element={<SignupBuyer setIsLogin={setIsLogin} />}
        />
        <Route
          path="/user-dashboard"
          element={<Dashboard setIsLogin={setIsLogin} />}
        />
        <Route path="/order" element={<OrderList setIsLogin={setIsLogin} />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route
          path="/message"
          element={<Message setTotalNotification={setTotalNotification} />}
        />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/payment/succuess/:id" element={<PaymentSuccuess />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
