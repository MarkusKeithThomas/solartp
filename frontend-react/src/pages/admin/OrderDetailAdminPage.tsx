import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Row, Col, Badge, Table, Button, Form } from "react-bootstrap";
import {
  Order,
  OrderStatus,
  PaymentMethodEnum,
  PaymentStatus,
} from "../../type/order";
import { fetchOrdersApi } from "../../api/admin/orderApi";

const OrderDetailAdminPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [adminNote, setAdminNote] = useState<string>("");

  useEffect(() => {
    fetchOrdersApi().then((res) => {
      const data = res.find((o) => o.id === Number(id));
      if (data) {
        setOrder({
          ...data,
          status: data.status as OrderStatus,
          paymentMethod: data.paymentMethod as PaymentMethodEnum,
          paymentStatus: data.paymentStatus as PaymentStatus,
        });
      }
    });
  }, [id]);

  const handleMarkAsCompleted = (note:string) => {
    if (!adminNote) return;
    setOrder((prevOrder) => {
      if (prevOrder) {
        return {
          ...prevOrder,
          note: adminNote,
        };
      }
      return prevOrder;
    }
    );
    // Reset ghi chú sau khi cập nhật
    setAdminNote("");
  };

  if (!order) return <p className="text-center">Không tìm thấy đơn hàng</p>;

  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5>🧾 Chi tiết đơn hàng #{order.orderCode}</h5>
          <Button variant="secondary" onClick={() => navigate("/admin/orders")}>
            Quay lại
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col md={6}>
            <h6>📌 Trạng thái đơn hàng</h6>
            <Badge bg="info" className="me-2">
              {order.status}
            </Badge>
          </Col>
          <Col md={6}>
            <h6>💳 Thanh toán</h6>
            <p>
              {order.paymentMethod} - {order.paymentStatus}
            </p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <h6>👤 Người nhận</h6>
            <p>{order.shippingAddress?.fullName || ""}</p>
<p>{order.shippingAddress?.phone || ""}</p>
<p>{order.shippingAddress?.email || ""}</p>
<p>{order.shippingAddress?.addressLine || ""}</p>
          </Col>
          <Col md={6}>
            <h6>💰 Thông tin thanh toán</h6>
            <p>Tổng tiền: {order.totalAmount.toLocaleString()}đ</p>
            <p>Giảm giá: -{order.discountAmount.toLocaleString()}đ</p>
            <p>
              <strong>Thành tiền: {order.finalAmount.toLocaleString()}đ</strong>
            </p>

  <Form.Group className="mb-3">
    <Form.Label>🛠 Ghi chú thêm</Form.Label>
    <Form.Control
  as="textarea"
  rows={2}
  placeholder="Ghi chú thêm thông tin cho đơn hàng này"
  value={adminNote}
  onChange={(e) => setAdminNote(e.target.value)}
/>
  </Form.Group>

  <Button
    variant="primary"
    onClick={() => handleMarkAsCompleted(adminNote)}
  >
    ✅ Thêm ghi chú
  </Button>
          </Col>
        </Row>

        <h6>📦 Danh sách sản phẩm</h6>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Tổng</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td>
                  {item.productName} <br />
                  <small className="text-muted">SKU: {item.productSku}</small>
                </td>
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString()}đ</td>
                <td>{item.totalPrice.toLocaleString()}đ</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default OrderDetailAdminPage;
