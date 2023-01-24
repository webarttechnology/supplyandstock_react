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
import TermsAndConditions from "../pages/TermsAndConditions";
import Shipping from "../pages/Shipping";
import AccountActive from "../pages/AccountActive";
import StripeAccountActive from "../pages/StripeAccountActive";
import Sellers from "../pages/Sellers";
import Contact from "../pages/Contact";
import Buyers from "../pages/Buyers";
import About from "../pages/About";

const AppRouter = () => {
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("isLoginCheck"))
  );
  const [totalNotification, setTotalNotification] = useState("");
  const [commonModal, setCommonModal] = useState(false);

  return (
    <Router>
      {isLogin ? (
        <>
          <Header isLogin={isLogin} totalNotification={totalNotification} />
          <Routes>
            <Route
              path="/home"
              element={
                <Home
                  setCommonModal={setCommonModal}
                  commonModal={commonModal}
                />
              }
            />
            <Route
              path="/active-account"
              element={
                <AccountActive
                  setCommonModal={setCommonModal}
                  commonModal={commonModal}
                />
              }
            />

            <Route
              path="/user-dashboard"
              element={<Dashboard setIsLogin={setIsLogin} />}
            />
            <Route
              path="/user/account-active"
              element={
                <StripeAccountActive
                  setIsLogin={setIsLogin}
                  setCommonModal={setCommonModal}
                  commonModal={commonModal}
                />
              }
            />
            {/* <Route
              path="/"
              element={
                <Login
                  setCommonModal={setCommonModal}
                  commonModal={commonModal}
                  setIsLogin={setIsLogin}
                />
              }
            /> */}
            {/* <Route
              path="/seller/signup"
              element={<SignupSeller setIsLogin={setIsLogin} />}
            /> */}
            <Route
              path="/buyer/login"
              element={<Logins setIsLogin={setIsLogin} />}
            />
            <Route
              path="/buyer/signup"
              element={<SignupBuyer setIsLogin={setIsLogin} />}
            />
            <Route path="/" element={<Dashboard setIsLogin={setIsLogin} />} />
            <Route
              path="/order"
              element={<OrderList setIsLogin={setIsLogin} />}
            />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route
              path="/message"
              element={<Message setTotalNotification={setTotalNotification} />}
            />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/payment/succuess/:id" element={<PaymentSuccuess />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/shipping" element={<Shipping />} />
          </Routes>
        </>
      ) : (
        <>
          <Header isLogin={isLogin} totalNotification={totalNotification} />
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  setCommonModal={setCommonModal}
                  commonModal={commonModal}
                  setIsLogin={setIsLogin}
                />
              }
            />
            <Route path="/sellers" element={<Sellers />} />
            <Route path="/buyers" element={<Buyers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

            <Route
              path="/active-account"
              element={
                <AccountActive
                  setCommonModal={setCommonModal}
                  commonModal={commonModal}
                />
              }
            />
            <Route
              path="/home"
              element={
                <Home
                  setCommonModal={setCommonModal}
                  commonModal={commonModal}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  setCommonModal={setCommonModal}
                  commonModal={commonModal}
                  setIsLogin={setIsLogin}
                />
              }
            />
            <Route
              path="/seller/signup"
              element={
                <SignupSeller
                  setCommonModal={setCommonModal}
                  commonModal={commonModal}
                  setIsLogin={setIsLogin}
                />
              }
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
            <Route
              path="/order"
              element={<OrderList setIsLogin={setIsLogin} />}
            />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route
              path="/message"
              element={<Message setTotalNotification={setTotalNotification} />}
            />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/payment/succuess/:id" element={<PaymentSuccuess />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/shipping" element={<Shipping />} />
          </Routes>
        </>
      )}
      <ToastContainer />

      <Footer />
    </Router>
  );
};

export default AppRouter;
