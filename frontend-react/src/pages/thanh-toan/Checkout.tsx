import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { CartCheckout } from "../gio-hang/CartCheckout";
import { useAuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export function Checkout() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    note: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData)); // ✅ Chuyển chuỗi JSON thành object
    }
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = { name: "", phone: "", address: "", email: "" };

    if (!formData.name) newErrors.name = "Vui lòng nhập họ tên!";
    if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại!";
    if (!formData.address) newErrors.address = "Vui lòng nhập địa chỉ!";
    if (!formData.email.includes("@")) newErrors.email = "Email không hợp lệ!";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    localStorage.setItem("formData", JSON.stringify(formData));
    navigate("/thanh-toan/confirm");
  };

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
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  type="text"
                  placeholder="Nhập họ tên"
                  required
                />
              </Col>
              <Col>
                <Form.Label>Số điện thoại *</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ giao hàng *</Form.Label>
              <Form.Control
                name="address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
                type="text"
                placeholder="Địa chỉ đầy đủ"
                required
              />
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  type="text"
                  placeholder="Nhập email"
                  required
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
          <Button
            variant="primary"
            size="lg"
            className="w-100 mt-auto"
            onClick={handleSubmit}
          >
            Hoàn tất đặt hàng
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
