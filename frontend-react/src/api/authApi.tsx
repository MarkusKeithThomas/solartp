import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// ✅ Tạo instance axios với baseURL
const authAPI = axios.create({
  baseURL: `${API_BASE_URL}`,
  withCredentials: true, // ✅ Quan trọng nếu dùng HTTP-Only Cookies
});


authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor: Tự động refresh token khi hết hạn
authAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.warn("Token hết hạn, thử refresh token...");
  
        try {
          const refreshResponse = await axios.post(
            `${API_BASE_URL}/refresh`,
            {},
            { withCredentials: true }
          );
  
          if (refreshResponse.data.accessToken) {
            localStorage.setItem("accessToken", refreshResponse.data.data);
            console.log(" Refresh token thành công!");
  
            // ✅ Thử gửi lại request ban đầu với token mới
            error.config.headers.Authorization = `Bearer ${refreshResponse.data.data}`;
            return authAPI(error.config);     
               }
        } catch (refreshError) {
          console.error("Lỗi refresh token:", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user-info");
          window.location.href = "/tai-khoan"; // Chuyển hướng về đăng nhập
        }
      }
      return Promise.reject(error);
    }
  );

export default authAPI;