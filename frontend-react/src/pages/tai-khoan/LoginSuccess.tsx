import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("accessToken");

        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            console.log("Đăng nhập thành công! "+accessToken);
            navigate("/"); // ✅ Chuyển đến trang chu
        }
    }, [navigate]);

    return <h2>Đang đăng nhập...</h2>;
};

export default LoginSuccess;