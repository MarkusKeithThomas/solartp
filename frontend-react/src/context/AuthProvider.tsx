import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useUserLocalStorage } from "../hook/useUserLocalStorage";

// Kiểu dữ liệu người dùng
type User = {
  id: number;
  email: string;
  name: string;
  avatar: string;
};

// Kiểu dữ liệu cho Context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
  handleErrorLogin: () => string;
  handleErrorRegister: () => string;
  successMessage: string;
  loginWithGoogle: () => void; // ✅ Thêm phương thức đăng nhập Google
  logoutAdmin: () => void; // ✅ Thêm phương thức đăng xuất Admin
}

// Tạo Context
const AuthContext = createContext<AuthContextType | null>(null);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// **Provider bao bọc ứng dụng**
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useUserLocalStorage<User | null>("user-info",null); // ✅ Thêm user-info
  const [errorMessage, setErrorMessage] = useState(""); // Biến lưu lỗi
  const [errorMessageRegister, setErrorMessageRegister] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate(); // ✅ Đưa `useNavigate` vào đây, trong Component Function

  function handleErrorLogin() {
    return errorMessage;
  }
  function handleErrorRegister() {
    return errorMessageRegister;
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user-info");
  
    // Nếu không có token hoặc user => Xem như chưa đăng nhập
    if (!accessToken || !savedUser) {
      //logout(); // đảm bảo dọn dẹp nếu cần
      return;
    }
  
    try {
      const parsedUser = JSON.parse(savedUser);
      if (!parsedUser?.id || !parsedUser?.email) {
        throw new Error("Thông tin user không hợp lệ");
      }
  
      // Tạm gán user từ localStorage
      setUser(parsedUser);
  
      // Gọi API xác thực lại user
      axios
        .get(`${API_BASE_URL}/tai-khoan/user-info`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          const userData = response.data.data;
          setUser(userData);
          localStorage.setItem("user-info", JSON.stringify(userData));
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            console.warn("Access Token hết hạn. Đang thực hiện refresh...");
            handleRefreshToken(); // Gọi hàm xử lý refresh token
          } else {
            console.error("Lỗi xác thực người dùng:", error);
            logout(); // fallback nếu lỗi bất thường
          }
        });
    } catch (e) {
      console.warn("Lỗi khi parse user-info. Đăng xuất người dùng.");
      logout();
    }
  }, []);

  const handleRefreshToken = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );

      if (response.data.data) {
        localStorage.setItem("accessToken", response.data.data);
      } else {
        logout();
        navigate("/tai-khoan");
      }
    } catch (error) {
      logout();
    }
  };

  // Hàm đăng nhập
  const login = async (email: string, password: string) => {
    setErrorMessage(""); // Xóa lỗi cũ
    try {
      const response = await axios.post(
        `${API_BASE_URL}/tai-khoan/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.code !== 200) {
        throw new Error(response.data.data || "Đăng nhập thất bại!");
      }
      // ✅ Lưu Access Token
      const accessToken = response.data.data;
      if (accessToken) {
        localStorage.setItem("accessToken", response.data.data);
      } else {
      }

      // ✅ 2. Gọi API `/user-info` để lấy thông tin user
      const userResponse = await axios.get(
        `${API_BASE_URL}/tai-khoan/user-info`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      // ✅ 3. Lưu user vào `localStorage` và React Context
      const userData = userResponse.data.data;
      setUser(userData);


      // ✅ Chuyển hướng đến trang chủ
      setSuccessMessage("🎉 Đăng nhập thành công! Welcome to SolarTP.");
      setTimeout(() => {
        navigate("/"); // Chuyển hướng sau 3 giây
      }, 2000);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Vui lòng đăng nhập lại"
        );

      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const register = async (email: string, password: string) => {
    setErrorMessageRegister(""); // Xóa lỗi cũ
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/tai-khoan/register`,
        { email, password }
      );

      if (response.data.code !== 200) {
        setErrorMessageRegister(response.data.data);
        throw new Error(response.data.data);
      }

      // ✅ Nếu đăng ký thành công, chuyển hướng đến trang đăng nhập
      setSuccessMessage("🎉 Đăng ký thành công! Vui lòng đăng nhập.");
      setTimeout(() => {
        navigate("/tai-khoan");
      }, 2000);
    } catch (error: any) {
      setErrorMessageRegister(
        error.response?.data?.data || "Vui lòng đăng kí lại"
      );
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  // Đăng xuất người dùng
  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken"); // ✅ Xóa accessToken hoàn toàn
    localStorage.removeItem("user-info"); // ✅ Xóa thông tin user
    googleLogout();
    navigate("/tai-khoan");
  };
  const logoutAdmin = () => {
    localStorage.removeItem("user-info-admin");
    localStorage.removeItem("admin-auth");
    navigate("/admin/login"); // 👉 Không reload trang, chuyển nội bộ
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        handleErrorLogin,
        register,
        handleErrorRegister,
        successMessage,
        loginWithGoogle,
        logoutAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook sử dụng Context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext phải nằm trong AuthProvider");
  return context;
}
