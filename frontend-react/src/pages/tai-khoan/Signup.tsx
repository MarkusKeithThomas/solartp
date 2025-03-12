import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import FaGogle from "../../assets/Google.svg";
import { useAuthContext } from "../../context/AuthProvider";
import { useState } from "react";

export function SignUp() {
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const { register, handleErrorRegister, successMessage } = useAuthContext();
  const errorMessage = handleErrorRegister();

  const handleSubmit2 = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn form tải lại trang
    register(email1, password1);
  };
  return (
    <Container className="d-flex justify-content-center">
      <Row className="w-100" style={{ maxWidth: "400px" }}>
        <Col>
          {/* Tiêu đề */}
          <h1 className="text-center fw-bold mb-5 mt-5">Đăng Ký</h1>
          {/* Hiển thị lỗi chung nếu có */}
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
          <Form onSubmit={handleSubmit2}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
                type="email"
                placeholder="example@example.com"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between">
                <Form.Label>Password</Form.Label>
                <a href="#" className="text-success text-decoration-none">
                  Forgot password?
                </a>
              </div>
              <Form.Control
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                type="password"
                placeholder="Enter your password"
              />
            </Form.Group>

            {/* Nút đăng nhập */}
            <Button
              type="submit"
              variant="dark"
              className="w-100 rounded-pill py-2 mt-3"
              style={{ fontSize: "18px" }}
            >
              Continue
            </Button>
          </Form>

          {/* Đăng ký tài khoản */}
          <p className="text-center mt-3">
            Bạn đã có tài khoản?{" "}
            <a href="/tai-khoan" className="text-success fw-bold">
              Đăng nhập
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
