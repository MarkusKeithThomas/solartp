import { Container, Row, Col, Button, Card, Alert, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api/orderApi";
import { OrderRequest, PaymentMethodEnum } from "../../type/order"; // điều chỉnh đường dẫn nếu cần
import { useState, useEffect } from "react";
import { CartCheckout } from "../gio-hang/CartCheckout";
import { useShoppingCart } from "../../context/ProductContext";

export function ConfirmOrder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false); // ✅ Thêm state toast

  const { voucher, selectedPayment, cartItems, clearCart } = useShoppingCart();

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData") || "{}");
    if (!storedFormData) {
      navigate("/thanh-toan");
    } else {
      setFormData(storedFormData);
    }
  }, [navigate]);

  const handleConfirmOrder = async () => {
    if (!formData || cartItems.length === 0) return;

    const order: OrderRequest = {
      cartId: formData.cartId || '',
      voucherCode: voucher || '',
      unit: formData.unit || '',
      note: formData.note || '',
      paymentMethod: selectedPayment || PaymentMethodEnum.COD,
      shippingAddress: {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        addressLine: formData.address,
        province: formData.province || '',
        district: formData.district || '',
        ward: formData.ward || '',
        addressNote: formData.note || '',
        type: formData.addressType || 'HOME'
      },
      orderItems: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    try {
      const response = await createOrder(order);
      console.log("✅ Đặt hàng thành công:", response);
      localStorage.removeItem("shopping-cart");
      clearCart();

      // ✅ Hiển thị toast và điều hướng sau 4s
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/trang-thai-hang");
      }, 4000);
    } catch (err: any) {
      console.error("❌ Lỗi đặt hàng:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Không thể đặt hàng. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <Container>
      <h2 className="fw-bold text-center mt-4">Xác Nhận Đơn Hàng</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            {error && <Alert variant="danger">{error}</Alert>}

            <h3 className="mb-4">Thông Tin Giao Hàng</h3>
            {formData && (
              <>
                <p><strong>Họ tên:</strong> {formData.name}</p>
                <p><strong>Số điện thoại:</strong> {formData.phone}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Địa chỉ:</strong> {formData.address}</p>
                <p><strong>Ghi chú:</strong> {formData.note || "Không có ghi chú"}</p>
              </>
            )}

            <CartCheckout />

            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={() => navigate("/thanh-toan")}>
                🔙 Quay lại chỉnh sửa
              </Button>
              <Button variant="primary" onClick={handleConfirmOrder}>
                ✅ Xác nhận đơn hàng
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

{/* Overlay mờ phía sau */}
{showToast && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)", // nền đen mờ
      zIndex: 9998
    }}
  />
)}

{/* Toast chính giữa, to hơn */}
<ToastContainer className="position-fixed top-50 start-50 translate-middle" style={{ zIndex: 9999 }}>
  <Toast
    show={showToast}
    onClose={() => setShowToast(false)}
    delay={4000}
    autohide
    animation
    bg="success"
    style={{ minWidth: "350px", padding: "1rem" }}
  >
    <Toast.Header closeButton={false}>
      <strong className="me-auto fs-5">🎉 Đặt Hàng Thành Công</strong>
    </Toast.Header>
    <Toast.Body className="text-white fs-5">
      Đơn hàng của bạn đã được tạo. Đang chuyển đến trang trạng thái...
    </Toast.Body>
  </Toast>
</ToastContainer>
    </Container>
  );
}