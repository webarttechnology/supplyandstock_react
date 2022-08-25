import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../components/Home";
import Dashboard from "../pages/Dashboard";
import EditProfile from "../pages/EditProfile";
import Login from "../pages/Login";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<Dashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default AppRouter;
