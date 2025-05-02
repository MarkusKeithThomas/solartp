import { ApiResponse } from "../type/admin/ApiResponse";
import authAPI from "./authApi";

// Helper GET chuẩn
export async function apiGet<T>(url: string, params?: any): Promise<T> {
    const response = await authAPI.get<ApiResponse<T>>(url, { params });
  
    if (response.data.code !== 200) {
      throw new Error(response.data.message || "Đã có lỗi xảy ra từ server");
    }
  
    return response.data.data;
  }

// Helper POST chuẩn
export async function apiPost<T>(url: string, body?: any): Promise<T> {
  const response = await authAPI.post<{ data: T }>(url, body);
  return response.data.data;
}