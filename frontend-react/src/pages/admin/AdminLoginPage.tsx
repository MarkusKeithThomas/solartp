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
import { User } from '../../type/admin/user';
import { useUserLocalStorage } from "../../hook/useUserLocalStorage";
import authAPI from "../../api/authApi";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useUserLocalStorage<User | null>("user-info-admin", null); // ✅ Thêm user-info
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setErrorMessage("");
  
    try {
      const response = await authAPI.post(
        "/tai-khoan/login",
        { email, password },
        { withCredentials: true }
      );
      const accessToken  = response.data.data;
      localStorage.setItem("accessToken", accessToken);
  
      const userResponse = await authAPI.get<{ data: User }>("/tai-khoan/user-info");
      const userData = userResponse.data.data;

      setUser(userData);
      setSuccessMessage("🎉 Đăng nhập thành công!");
      localStorage.setItem("admin-auth", "true");
      localStorage.setItem("user-info-admin", JSON.stringify(userData));
  
      setTimeout(() => {
        navigate("/admin");
      }, 500);
    } catch (error: any) {
      setErrorMessage(error?.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
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
    <Container className="d-flex align-items-center justify-content-center">
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
