import { Card, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { FaGoogle, FaEnvelope } from "react-icons/fa";

export function CardGotInfo() {
  return (
    <Card className="shadow-sm border-0 p-3 rounded-3">
      <Card.Body>
        {/* 🔥 Tiêu đề */}
        <Row className="align-items-center">
          <Col md={2} className="text-center">
            <FaEnvelope size={24} className="text-warning" />
          </Col>
          <Col md={10}>
            <h5 className="fw-bold">Đừng bỏ lỡ tin tức quan trọng!</h5>
            <p className="text-muted mb-0">
              Nhận tóm tắt tin tức nổi bật về điện mặt trời, hấp dẫn nhất 24 giờ qua trên Solar TP.
            </p>
          </Col>
        </Row>

        {/* 🔥 Form nhập email */}
        <Form className="mt-3">
          <InputGroup>
            <Form.Control type="email" placeholder="Địa chỉ Email hoặc Phone" />
            <Button variant="dark">Đăng ký</Button>
          </InputGroup>
        </Form>

        {/* 🔥 Hoặc đăng ký bằng MXH */}
        <div className="text-center my-2 text-muted">Hoặc</div>
        <Row className="gx-2">
          <Col>
            <Button variant="light" className="w-100 border">
              <FaGoogle className="me-10 ms-10 text-danger" /> Google
            </Button>
          </Col>
        </Row>

        {/* 🔥 Điều khoản */}
        <p className="text-muted small mt-2 text-center">
          *Khi đăng ký, bạn đồng ý{" "}
          <p className="text-decoration-none">
            điều khoản của Solar TP
          </p>
        </p>
      </Card.Body>
    </Card>
  );
}