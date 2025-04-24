import { useEffect, useState } from "react";
import { Table, Card, Button, Spinner, Badge, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Order, OrderStatus } from "../../type/order";
import { formatVietnameseDate } from "../../ultities/fotmatDateTime";
import { fetchOrdersApi, updateOrderApi } from "../../api/admin/orderApi";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStatusByOrderId, setSelectedStatusByOrderId] = useState<{
    [orderId: number]: OrderStatus;
  }>({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const orderData = await fetchOrdersApi();
        setOrders(orderData);

        // Khởi tạo trạng thái ban đầu cho từng đơn hàng
        const statusMap = orderData.reduce((acc: any, order: Order) => {
          acc[order.id] = order.status;
          return acc;
        }, {});
        setSelectedStatusByOrderId(statusMap);
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateOrder = async (orderId: number) => {
    try {
      const newStatus = selectedStatusByOrderId[orderId];
      await updateOrderApi(orderId, newStatus);
      alert("✅ Đã cập nhật trạng thái đơn hàng!");

      // Cập nhật lại trạng thái trong danh sách
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn hàng:", error);
      alert("❌ Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    PLACED: "🕐 Chờ xác nhận",
    CONFIRMED: "✅ Đã xác nhận",
    WAITING_FOR_PICKUP: "📦 Chờ lấy hàng",
    DELIVERING: "🚚 Đang giao",
    COMPLETED: "🎉 Hoàn tất",
    CANCELED: "❌ Đã hủy",
  };

  const handleStatusChange = (orderId: number, newStatus: OrderStatus) => {
    setSelectedStatusByOrderId((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
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
                    value={selectedStatusByOrderId[order.id] || order.status}
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
                </td>
                <td>{formatVietnameseDate(order.createdAt)}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                  >
                    Chi tiết
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-success"
                    className="ms-2"
                    onClick={() => handleUpdateOrder(order.id)}
                  >
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