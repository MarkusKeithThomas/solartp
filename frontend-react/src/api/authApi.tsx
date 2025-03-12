import axios from "axios";

// ✅ Tạo một instance Axios
const authAPI = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // ✅ Quan trọng nếu dùng HTTP-Only Cookies
});

// ✅ Interceptor: Tự động thêm `accessToken` vào `headers`
authAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.warn("Token hết hạn, thử refresh token...");
  
        try {
          const refreshResponse = await axios.post(
            "http://localhost:8080/tai-khoan/refresh",
            {},
            { withCredentials: true }
          );
  
          if (refreshResponse.data.accessToken) {
            localStorage.setItem("accessToken", refreshResponse.data.data);
            console.log(" Refresh token thành công!");
  
            // ✅ Thử gửi lại request ban đầu với token mới
            error.config.headers.Authorization = `Bearer ${refreshResponse.data.data}`;
            return axios(error.config);
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