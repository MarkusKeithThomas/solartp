import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import FaGogle from '../../assets/Google.svg'


export function Login(){
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row className="w-100" style={{ maxWidth: "400px" }}>
        <Col>
          {/* Tiêu đề */}
          <h1 className="text-center fw-bold mb-5 mt-5">Đăng Nhập</h1>

          <Button variant="light" className="w-100 mb-4 d-flex align-items-center" style={{height:"60px"}}>
          <img src={FaGogle} alt="Google Icon" width="24" height="24" className="me-2" />
          Đăng Nhập Với Google
          </Button>

          {/* Hoặc */}
          <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="mx-2 text-muted">OR</span>
            <hr className="flex-grow-1" />
          </div>

          {/* Form đăng nhập */}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="example@example.com" />
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between">
                <Form.Label>Password</Form.Label>
                <a href="#" className="text-success text-decoration-none">
                  Forgot password?
                </a>
              </div>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>

            {/* Nút đăng nhập */}
            <Button
              variant="dark"
              className="w-100 rounded-pill py-2 mt-3"
              style={{ fontSize: "18px" }}
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
  );
};

export default Login;