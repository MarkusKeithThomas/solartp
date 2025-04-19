import { Category } from "../../type/admin/category";
import authAPI from "../authApi";

export const getAllCategoriesApi = async (): Promise<Category[]> => {
  const response = await authAPI.get("/categories/get-categories");
  return response.data.data; // hoặc response.data tùy backend trả
};

export const addCategoryApi = async (category: Category) => {
  const response = await authAPI.post("/categories/add", category);
  return response.data.data;
};

export const updateCategoryApi = async (category: Category) => {
  const response = await authAPI.put(`/categories/${category.id}`, category);
  return response.data.message;
};