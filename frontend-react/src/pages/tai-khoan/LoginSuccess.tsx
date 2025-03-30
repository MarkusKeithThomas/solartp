import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


    useEffect(() => {
        const fetchUserInfo = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const accessToken = urlParams.get("accessToken");

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
                try {
                    const response = await axios.get(`${API_BASE_URL}/tai-khoan/user-info`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    localStorage.setItem("user-info", JSON.stringify(response.data.data));
                    navigate("/");
                } catch (err) {
                    console.error("Lỗi khi lấy thông tin user sau login:", err);
                    navigate("/login"); // fallback nếu lỗi
                }
            } else {
                navigate("/");
            }
        };

        fetchUserInfo();
    }, [navigate]);

    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="spinner-border" role="status" />
        <span className="ms-3">Đang đăng nhập...</span>
      </div>
    );};

export default LoginSuccess;