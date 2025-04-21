import { Card, Col, Row, Table, ProgressBar } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const dataChart = [
  { month: "Jan", current: 12, previous: 18 },
  { month: "Feb", current: 15, previous: 14 },
  { month: "Mar", current: 18, previous: 20 },
  { month: "Apr", current: 22, previous: 19 },
  { month: "May", current: 26, previous: 21 },
  { month: "Jun", current: 30, previous: 25 },
];

const salesByLocation = [
  { name: "New York", value: 72000 },
  { name: "San Francisco", value: 39000 },
  { name: "Sydney", value: 25000 },
  { name: "Singapore", value: 61000 },
];

const pieData = [
  { name: "Direct", value: 38.6, color: "#6366f1" },
  { name: "Affiliate", value: 20, color: "#10b981" },
  { name: "Sponsored", value: 25, color: "#f59e0b" },
  { name: "Email", value: 16.4, color: "#ef4444" },
];

const topProducts = [
  { name: "Shirt", price: "$76.89", category: "Men", qty: 128, amount: "$6,647.15" },
  { name: "T-Shirt", price: "$79.80", category: "Women", qty: 89, amount: "$5,647.15" },
  { name: "Pant", price: "$86.65", category: "Kids", qty: 74, amount: "$3,647.15" },
  { name: "Sweater", price: "$56.07", category: "Men", qty: 69, amount: "$3,147.15" },
];

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h4 className="mb-4">📊 Report Analysis</h4>
      <Row className="mb-4">
        <Col md={3}><Card body>Total Sales: $34,456.00</Card></Col>
        <Col md={3}><Card body>Total Orders: 3,456</Card></Col>
        <Col md={3}><Card body>Total Revenue: $1,456.00</Card></Col>
        <Col md={3}><Card body>Total Customers: 42,456</Card></Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>Revenue</Card.Header>
            <Card.Body style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataChart}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="current" stroke="#6366f1" name="Current Week" />
                  <Line type="monotone" dataKey="previous" stroke="#94a3b8" name="Previous Week" />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>Top Selling Products</Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <td>{item.qty}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Sales by Location</Card.Header>
            <Card.Body>
              {salesByLocation.map((item, i) => (
                <div key={i} className="d-flex justify-content-between mb-2">
                  <span>{item.name}</span>
                  <span>{item.value.toLocaleString()}</span>
                </div>
              ))}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>Total Sales</Card.Header>
            <Card.Body>
              <PieChart width={250} height={200}>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend layout="horizontal" align="center" verticalAlign="bottom" />
              </PieChart>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Monthly Target</Card.Header>
            <Card.Body>
              <h5>75.34%</h5>
              <ProgressBar now={75.34} variant="info" className="mb-2" />
              <small>You earned $3267 today. Keep it up!</small>
              <hr />
              <div className="d-flex justify-content-between">
                <div>
                  <small>Target</small>
                  <div>$25k</div>
                </div>
                <div>
                  <small>Revenue</small>
                  <div>$18k</div>
                </div>
                <div>
                  <small>Today</small>
                  <div>$1.8k</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
