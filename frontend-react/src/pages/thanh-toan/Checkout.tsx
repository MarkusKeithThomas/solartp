import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { CartCheckout } from "../gio-hang/CartCheckout";
import { useAuthContext } from "../../context/AuthProvider";

export function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [email, setEmail] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email); // ✅ Điền email từ localStorage
    }
  }, []);

  return (
    <Container className="checkout-container">
      <Row>
        {/* Thông tin giao hàng */}
        <Col lg={7}>
          <h2 className="fw-bold">Đặt hàng</h2>
          <Alert variant="info" className="mb-4">
            Bạn có mã Khuyến mãi? <a href="#">Nhập mã ngay.</a>
          </Alert>
          <h4 className="fw-bold">Thông tin giao hàng</h4>
          <Form className="p-4 bg-light rounded shadow-sm">
            <Row className="mb-3">
              <Col>
                <Form.Label>Họ tên *</Form.Label>
                <Form.Control type="text" placeholder="Nhập họ tên" required />
              </Col>
              <Col>
                <Form.Label>Số điện thoại *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ giao hàng *</Form.Label>
              <Form.Control type="text" placeholder="Địa chỉ đầy đủ" required />
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control type="text" placeholder="Ghi chú đơn hàng" />
              </Col>
            </Row>
          </Form>
        </Col>

        {/* Tóm tắt đơn hàng */}
        <Col className="d-flex flex-column h-100">
          <CartCheckout />

          {/* Đẩy nút "Hoàn tất đặt hàng" xuống cuối */}
          <Button variant="primary" size="lg" className="w-100 mt-auto">
            Hoàn tất đặt hàng
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
