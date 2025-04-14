import { useState } from "react";
import { OrderTrackingStatus } from "./OrderTrackingStatus";
import { fetchOrderByPhone } from "../../api/orderApi";
import { Form, InputGroup, Button, Spinner, Table } from "react-bootstrap";
import { Order } from '../../type/order';

export function OrderDetailPage() {
  const [phone, setPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]); // ✅ nhận nhiều đơn

  const handleCheckingOrder = async () => {
    if (!phone) return;
    setLoading(true);
    try {
      const result = await fetchOrderByPhone(phone); // API trả mảng đơn
      setOrders(result);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container justify-items-center mt-5 gx-0 pb-5"
      style={{ paddingRight: 0 }}
    >
      <Form.Label className="fw-bold">Bạn có đơn hàng?</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Nhập số điện thoại đơn hàng..."
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
          style={{ maxWidth: "500px" }}
        />
        <Button
          variant="primary"
          onClick={handleCheckingOrder}
          disabled={loading}
          style={{ maxWidth: "150px" }}
        >
          {loading ? <Spinner size="sm" animation="border" /> : "Kiểm tra"}
        </Button>
      </InputGroup>

      <h4>Kết quả đơn hàng</h4>

      {loading ? (
        <p>Đang tải trạng thái đơn hàng...</p>
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.id}
            className="mb-4 p-3 border rounded shadow-sm bg-light"
          >
            <h5>Đơn hàng: {order.orderCode}</h5>
            <OrderTrackingStatus
              status={order.status}
            />

            <div className="table-responsive mt-3">
              <Table striped bordered hover size="sm">
                <thead className="table-light">
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                    <th>Ngày đặt</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.productName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price.toLocaleString()}₫</td>
                      <td>{item.totalPrice.toLocaleString()}₫</td>
                      <td>{order.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="text-end mt-2">
              <p><strong>Tổng tiền hàng:</strong> {order.totalAmount.toLocaleString()}₫</p>
              <p><strong>Giảm giá:</strong> {order.discountAmount.toLocaleString()}₫</p>
              <h5 className="text-success">
                <strong>Thành tiền:</strong> {order.finalAmount.toLocaleString()}₫
              </h5>
              <h6>Ghi Chú: Trạng thái thanh toán {order.paymentMethod} và {order.paymentStatus}</h6>
            </div>
          </div>
        ))
      ) : phone ? (
        <p>Không tìm thấy đơn hàng với số điện thoại: {phone}</p>
      ) : null}
    </div>
  );
}