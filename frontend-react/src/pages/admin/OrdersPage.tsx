import { Table, Badge, Button, Card } from "react-bootstrap";

const orders = [
  {
    id: "#001",
    customer: "Nguyễn Văn A",
    total: 1500000,
    status: "Đang xử lý",
    date: "2025-04-15",
  },
  {
    id: "#002",
    customer: "Lê Thị B",
    total: 950000,
    status: "Đã giao",
    date: "2025-04-14",
  },
  {
    id: "#003",
    customer: "Trần Văn C",
    total: 560000,
    status: "Đã huỷ",
    date: "2025-04-13",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Đã giao":
      return "success";
    case "Đang xử lý":
      return "warning";
    case "Đã huỷ":
      return "danger";
    default:
      return "secondary";
  }
};

const OrdersPage = () => {
  return (
    <Card>
      <Card.Header>📦 Quản lý đơn hàng</Card.Header>
      <Card.Body>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.total.toLocaleString()}đ</td>
                <td>
                  <Badge bg={getStatusColor(order.status)}>{order.status}</Badge>
                </td>
                <td>
                  <Button variant="outline-primary" size="sm">
                    Xem chi tiết
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
