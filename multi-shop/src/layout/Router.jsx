import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/LoginPage";
import AdminProducts from "../pages/AdminProducts";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="admin-products" element={<AdminProducts />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
