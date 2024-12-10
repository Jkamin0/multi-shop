import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/LoginPage";
import AdminProducts from "../pages/AdminProducts";
import Layout from "../layout/Layout";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="admin-products" element={<AdminProducts />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
