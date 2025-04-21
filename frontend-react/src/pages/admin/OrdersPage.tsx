import { useEffect, useState } from "react";
import { Table, Card, Button, Spinner, Badge, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Order,
  OrderStatus,
  PaymentMethodEnum,
  PaymentStatus,
} from "../../type/order";
import orderData from "../../assets/fakedata/order.json"; // file JSON mock data
import { formatVietnameseDate } from '../../ultities/fotmatDateTime';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Load dữ liệu cứng từ file JSON
    const transformedOrders = orderData.map((order) => ({
      ...order,
      paymentMethod: order.paymentMethod as PaymentMethodEnum,
      paymentStatus: order.paymentStatus as PaymentStatus,
      status: order.status as OrderStatus,
    }));
    setOrders(transformedOrders);
    setLoading(false);
  }, []);

  const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    PLACED: "🕐 Chờ xác nhận",
    CONFIRMED: "✅ Đã xác nhận",
    WAITING_FOR_PICKUP: "📦 Chờ lấy hàng",
    DELIVERING: "🚚 Đang giao",
    COMPLETED: "🎉 Hoàn tất",
    CANCELED: "❌ Đã hủy",
  };

  const handleStatusChange = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    try {
      // Gọi API cập nhật trạng thái đơn hàng
      // await updateOrderStatusApi(orderId, newStatus);

      // ✅ Cập nhật lại trong UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("❌ Cập nhật trạng thái thất bại:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Card>
      <Card.Header>📦 Danh sách đơn hàng</Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Người nhận</th>
              <th>Thanh toán</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderCode}</td>
                <td>{order.shippingAddress?.fullName}</td>
                <td>
                  {order.paymentMethod} -{" "}
                  {order.paymentStatus === "PAID" ? (
                    <Badge bg="success">Đã thanh toán</Badge>
                  ) : (
                    <Badge bg="secondary">Chưa thanh toán</Badge>
                  )}
                </td>
                <td>{order.finalAmount.toLocaleString()}đ</td>
                <td>
                  <Form.Select
                    size="sm"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value as OrderStatus
                      )
                    }
                  >
                    {Object.values(OrderStatus).map((statusOption: string) => (
                      <option key={statusOption} value={statusOption}>
                        {ORDER_STATUS_LABELS[statusOption as OrderStatus] ??
                          statusOption}
                      </option>
                    ))}
                  </Form.Select>
                </td>{" "}
                <td>{formatVietnameseDate(order.createdAt)}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                  >
                    Chi tiết
                  </Button>
                  <Button size="sm" variant="outline-primary" className="ms-2">
                    Cập nhật
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default OrdersPage;
