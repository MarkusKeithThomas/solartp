import { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from '../../type/admin/user';
import { useUserLocalStorage } from "../../hook/useUserLocalStorage";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useUserLocalStorage<User | null>("user-info", null); // ✅ Thêm user-info
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const login = async (email: string, password: string) => {
    setErrorMessage(""); // Xóa lỗi cũ
    setIsLoading(true); // Bắt đầu loading
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

      // ✅ 2. Gọi API `/user-info` để lấy thông tin user
      const userResponse = await axios.get<{data:User}>(
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
      localStorage.setItem("admin-auth", "true");
      setIsLoading(false); // Kết thúc loading
      setTimeout(() => {
        navigate("/admin"); // Chuyển hướng sau 3 giây
      }, 500);
    } catch (error: any) {
      setIsLoading(false); // Kết thúc loading
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Vui lòng đăng nhập lại"
        );
      } else {
        setErrorMessage(error.message);
      }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setError("");
    login(email, password);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100" style={{ maxWidth: 400 }}>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="text-center mb-4">Đăng nhập quản trị</h4>

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

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="dark"
                    type="submit"
                    disabled={isLoading}
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: "60px" }}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2" />
                    ) : (
                      <i className="bi bi-lock-fill me-2"></i>
                    )}
                    Đăng nhập
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLoginPage;
