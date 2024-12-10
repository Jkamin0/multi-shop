import { useCallback } from "react";
import axios from "axios";

const useApi = () => {
  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  // Products Endpoints
  const getAllPublishedProducts = useCallback((params = {}) => {
    return api.get("/products/published", { params });
  }, []);

  const getAllProducts = useCallback((params = {}) => {
    return api.get("/products/all", { params });
  }, []);

  const getPublishedProductsGroupedByType = useCallback(() => {
    return api.get("/products/published?groupBy=product_type");
  }, []);

  const updateProduct = useCallback((productId, productData) => {
    return api.put(`/products/${productId}`, { product: productData });
  }, []);

  // Admin Endpoints
  const getAdminSettings = useCallback(() => {
    return api.get("/admin");
  }, []);

  const updateAdminSettings = useCallback((adminData) => {
    return api.put("/admin", { admin: adminData });
  }, []);

  return {
    getAllPublishedProducts,
    getAllProducts,
    getPublishedProductsGroupedByType,
    updateProduct,
    getAdminSettings,
    updateAdminSettings,
  };
};

export default useApi;
