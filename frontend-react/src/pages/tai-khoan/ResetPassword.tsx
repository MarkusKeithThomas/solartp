import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tai-khoan/reset-password`, { token, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("❌ Token không hợp lệ hoặc đã hết hạn.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="fw-bold text-center">Đặt lại mật khẩu</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <Form>
            <Form.Group>
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="mt-3 w-100" onClick={handleResetPassword}>
              Đặt lại mật khẩu
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}