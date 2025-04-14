import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const getPaginatedProducts = async (page: number = 0, size: number = 6) => {
    const res = await axios.get(`${API_BASE_URL}/products/getAllProduct?page=${page}&size=${size}`);
    console.log("API da duoc goi getPaginatedProducts")
  return res.data; // trả về { code, message, data }
};

export const fetchAllProducts = async ()=> {
  const res = await axios.get(`${API_BASE_URL}/products/getAllProductByRedis`);
  return res.data;
};
