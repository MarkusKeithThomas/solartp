import authAPI from "../authApi";
import { Product, Image, SpecificationGroups } from "../../context/ProductProvider";

// ✅ Lấy tất cả sản phẩm (Redis cache)
export const getAdminProducts = async (): Promise<Product[]> => {
  const res = await authAPI.get("/products/getAllProductByRedis");
  return res.data.data;
};

// ✅ Thêm sản phẩm mới
export const addProductApi = async (product: Product): Promise<Product> => {
  const res = await authAPI.post("/admin/products", product);
  return res.data.data;
};

// ✅ Cập nhật toàn bộ sản phẩm (PUT)
export const updateProductApi = async (product: Product): Promise<Product> => {
  const res = await authAPI.put(`/products/${product.id}`, product);
  return res.data.data;
};

// ✅ Xoá sản phẩm theo ID
export const deleteProductApi = async (id: number): Promise<void> => {
  await authAPI.delete(`/admin/products/${id}`);
};

// ✅ Lấy chi tiết sản phẩm theo ID
export const getProductByIdApi = async (id: number): Promise<Product> => {
  const res = await authAPI.get(`/products/details/${id}`);
  return res.data.data;
};

// ✅ Cập nhật một phần thông tin sản phẩm (PATCH)
export const updateProductFields = async (
  id: number,
  fields: Partial<Product>
): Promise<Product> => {
  const res = await authAPI.patch(`/products/${id}`, fields);
  return res.data.data;
};

// ✅ Cập nhật danh sách ảnh sản phẩm
export const updateProductImages = async (
  id: number,
  images: Image[]
): Promise<void> => {
  await authAPI.put(`/products/${id}/images`, images);
};

// ✅ Cập nhật thông số kỹ thuật sản phẩm
export const updateProductSpecifications = async (
  id: number,
  specs: SpecificationGroups
): Promise<void> => {
  await authAPI.put(`/products/${id}/specifications`, specs);
};