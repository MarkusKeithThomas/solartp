import { useState } from "react";
import { Form, Button, Alert, Container, Col, Row, Spinner } from "react-bootstrap";
import axios from "axios";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/tai-khoan/forgot-password`, { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("❌ Không tìm thấy tài khoản với email này.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="fw-bold text-center">Quên Mật Khẩu?</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <Form>
            <Form.Group>
              <Form.Label>Email của bạn</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <Button
              variant="primary"
              className="mt-3 w-100 d-flex justify-content-center align-items-center"
              onClick={handleForgotPassword}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Đang gửi yêu cầu...
                </>
              ) : (
                "Gửi yêu cầu đặt lại mật khẩu"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}