import { Product } from "../../context/ProductProvider";
import authAPI from "../authApi";

export const getAdminProducts = async () => {
    const res = await authAPI.get("/products/getAllProductByRedis");
    return res.data.data;
  };
  
  export const addProductApi = async (product: Product) => {
    const res = await authAPI.post("/admin/products", product);
    return res.data.data;
  };
  
  export const updateProductApi = async (product: Product) => {
    const res = await authAPI.put(`/admin/products/${product.id}`, product);
    return res.data.data;
  };
  
  export const deleteProductApi = async (id: number) => {
    return await authAPI.delete(`/admin/products/${id}`);
  };
  
  export const getProductByIdApi = async (id: number) => {
    const res = await authAPI.get(`/admin/products/${id}`);
    return res.data.data;
  };