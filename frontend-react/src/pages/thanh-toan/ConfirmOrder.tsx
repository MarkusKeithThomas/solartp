import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartCheckout } from "../gio-hang/CartCheckout";

export function ConfirmOrder() {
  const navigate = useNavigate();
  const formData = JSON.parse(localStorage.getItem("formData") || "{}");

  const handleConfirm = () => {
    console.log("✅ Xác nhận đơn hàng:", formData);
    localStorage.removeItem("formData"); // ✅ Xóa formData sau khi xác nhận
    navigate("/thanh-toan"); // ✅ Chuyển sang trang thanh toán
  };

  return (
    <Container>
      <h2 className="fw-bold text-center mt-4">Xác Nhận Đơn Hàng</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            <h3 className="align-items-center mb-4">Thông Tin Giao Hàng</h3>
            <p><strong>Họ tên:</strong> {formData.name}</p>
            <p><strong>Số điện thoại:</strong> {formData.phone}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Địa chỉ:</strong> {formData.address}</p>
            <p><strong>Ghi chú:</strong> {formData.note || "Không có ghi chú"}</p>
            <CartCheckout/>

            

            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={() => navigate("/thanh-toan")}>
                🔙 Quay lại chỉnh sửa
              </Button>
              <Button variant="primary" onClick={handleConfirm}>
                ✅ Xác nhận & Thanh toán
              </Button>
            </div>
          </Card>

        </Col>
        
      </Row>
    </Container>
  );
}