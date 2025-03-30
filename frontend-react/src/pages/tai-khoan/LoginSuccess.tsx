import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("accessToken");

        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            axios
              .get(`${API_BASE_URL}/tai-khoan/user-info`, {
                headers: { Authorization: `Bearer ${accessToken}` },
              })
              .then((response) => {
                localStorage.setItem("user-info", JSON.stringify(response.data.data));
                navigate("/");
              })
              .catch((err) => {
                console.error("Lỗi khi lấy thông tin user sau login:", err);
                navigate("/login"); // fallback nếu lỗi
              });
          }
    }, [navigate]);

    return <h2>Đang đăng nhập...</h2>;
};

export default LoginSuccess;