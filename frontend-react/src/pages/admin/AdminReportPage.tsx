// src/pages/admin/AdminReportPage.tsx
import { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button, Table } from "react-bootstrap";
import { PieChart, Pie, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import orderData from "../../assets/fakedata/order.json"; // dữ liệu đơn hàng
import { Order, OrderStatus, PaymentMethodEnum, PaymentStatus } from "../../type/order";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#FF4C4C"];

const AdminReportPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const transformed = orderData.map((o) => ({
      ...o,
      status: o.status as OrderStatus,
      paymentMethod: o.paymentMethod as PaymentMethodEnum,
      paymentStatus: o.paymentStatus as PaymentStatus,
    }));
    setOrders(transformed);
  }, []);

  // Tổng doanh thu theo ngày
  const revenuePerDay = Object.values(
    orders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString("vi-VN");
      acc[date] = acc[date] || { date, revenue: 0 };
      acc[date].revenue += order.finalAmount;
      return acc;
    }, {} as any)
  );

  // Tổng trạng thái đơn hàng
  const statusCount = Object.entries(
    orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  // Phương thức thanh toán
  const paymentCount = Object.entries(
    orders.reduce((acc, order) => {
      acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <Card>
      <Card.Header>📊 Báo Cáo Kinh Doanh</Card.Header>
      <Card.Body>
        <Row className="mb-4">
          <Col md={4}>
            <h6>1️⃣ Doanh thu theo ngày</h6>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenuePerDay}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#007bff" />
              </LineChart>
            </ResponsiveContainer>
          </Col>

          <Col md={4}>
            <h6>2️⃣ Trạng thái đơn hàng</h6>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusCount}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {statusCount.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Col>

          <Col md={4}>
            <h6>3️⃣ Phương thức thanh toán</h6>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={paymentCount}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#28a745" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <h6>📅 Bộ lọc</h6>
            <Form className="d-flex gap-3">
              <Form.Group>
                <Form.Label>Từ ngày</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Đến ngày</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Trạng thái</Form.Label>
                <Form.Select>
                  <option>Tất cả</option>
                  {Object.values(OrderStatus).map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button className="align-self-end">Lọc</Button>
            </Form>
          </Col>
        </Row>

        <hr />

        <h6>📑 Bảng đơn hàng</h6>
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thanh toán</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 10).map((o) => (
              <tr key={o.id}>
                <td>{o.orderCode}</td>
                <td>{o.shippingAddress.fullName}</td>
                <td>{o.finalAmount.toLocaleString()}đ</td>
                <td>{o.status}</td>
                <td>{o.paymentMethod}</td>
                <td>{new Date(o.createdAt).toLocaleDateString("vi-VN")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AdminReportPage;