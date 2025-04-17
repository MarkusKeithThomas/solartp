import { Category } from "../../type/admin/category";
import authAPI from "../authApi";

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await authAPI.get("/categories/get-categories");
  return response.data.data; // hoặc response.data tùy backend trả
};

export const addCategory = async (category: Category) => {
  const response = await authAPI.post("/categories/add", category);
  return response.data.data;
};
