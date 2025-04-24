// src/api/apiService.ts
import axios from "axios";
import authAPI from "./authApi";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const registerSolarPanelApi = async (data: any) => {
    const response = await axios.post(`${API_BASE_URL}/solar-panel/add-user`, data);
    return response.data;
};

export const registerSolarPanelListApi = async () => {
    const response = await authAPI.get("/solar-panel");
    return response.data;
  };