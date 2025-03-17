import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // ✅ Dùng thư viện mới
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../../context/AuthProvider";
import { useState } from "react";
import FaGogle from "../../assets/Google.svg";
import { useNavigate } from 'react-router-dom';

const GOOGLE_CLIENT_ID =
  "707353335287-iqf6miqalqt8d631q468fr2clnqpljc0.apps.googleusercontent.com"; // 🔹 Thay bằng Client ID của bạn

export function Login() {
  const [email, setEmail] = useState(""); // Lưu email
  const [password, setPassword] = useState(""); // Lưu password
  const { login, loginWithGoogle, handleErrorLogin, successMessage } =
    useAuthContext();
  const errorMessage = handleErrorLogin();
  const navite = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn form tải lại trang
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Container className="d-flex justify-content-center align-items-center">
        <Row className="w-100" style={{ maxWidth: "400px" }}>
          <Col>
            {/* Tiêu đề */}
            <h1 className="text-center fw-bold mb-4 mt-5">Đăng Nhập</h1>

            {/* Hiển thị lỗi nếu có */}
            {errorMessage && (
              <Alert variant="danger" className="text-center">
                {errorMessage}
              </Alert>
            )}
            {successMessage && (
              <Alert variant="success" className="text-center">
                {successMessage}
              </Alert>
            )}

            <Button
              onClick={loginWithGoogle}
              variant="light"
              className="w-100 mb-4 d-flex align-items-center"
              style={{ height: "60px" }}
            >
              <img
                src={FaGogle}
                alt="Google Icon"
                width="24"
                height="24"
                className="me-2"
              />
              Đăng Kí Với Google
            </Button>

            {/* Hoặc */}
            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" />
              <span className="mx-2 text-muted">OR</span>
              <hr className="flex-grow-1" />
            </div>

            {/* Form đăng nhập */}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                  <Form.Label>Password</Form.Label>
                  <a href="/tai-khoan/forgot-password"  className="text-success text-decoration-none">
                    Forgot password?
                  </a>
                </div>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {/* Nút đăng nhập */}
              <Button
                onClick={() => login(email, password)}
                variant="dark"
                className="w-100 rounded-pill py-2 mt-3"
                style={{ fontSize: "18px" }}
                type="submit"
              >
                Continue
              </Button>
            </Form>

            {/* Đăng ký tài khoản */}
            <p className="text-center mt-3">
              Chưa có tài khoản?{" "}
              <a href="/tai-khoan/sign-up" className="text-success fw-bold">
                Tạo tài khoản mới
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </GoogleOAuthProvider>
  );
}

export default Login;
