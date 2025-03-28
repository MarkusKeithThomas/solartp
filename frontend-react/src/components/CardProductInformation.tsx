import { Row, Col, Accordion } from "react-bootstrap";

export function CardProductInformation() {
  return (
      <Accordion alwaysOpen className="mt-4"> {/* Giữ nguyên khi mở */}
        
        {/* Thông số đèn */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Thông số đèn</Accordion.Header>
          <Accordion.Body>
            <Row className="bg-light p-2">
              <Col md={6}><strong>Công suất:</strong></Col>
              <Col md={6}>100W</Col>
            </Row>
            <Row className="p-2">
              <Col md={6}><strong>Kích thước đèn:</strong></Col>
              <Col md={6}>380*340*45mm</Col>
            </Row>
            <Row className="bg-light p-2">
              <Col md={6}><strong>Vật liệu:</strong></Col>
              <Col md={6}>Nhôm sơn tĩnh điện được đúc nguyên khối</Col>
            </Row>
            <Row className="p-2">
              <Col md={6}><strong>Cấp độ bảo vệ:</strong></Col>
              <Col md={6}>IP67</Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* Nguồn sáng */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Nguồn sáng</Accordion.Header>
          <Accordion.Body>
            <Row className="bg-light p-2">
              <Col md={6}><strong>Chíp LED:</strong></Col>
              <Col md={6}>240 Leds SM 3030 công suất cao</Col>
            </Row>
            <Row className="p-2">
              <Col md={6}><strong>Tuổi thọ LED:</strong></Col>
              <Col md={6}>50.000 giờ</Col>
            </Row>
            <Row className="bg-light p-2">
              <Col md={6}><strong>Thấu kính:</strong></Col>
              <Col md={6}>Có</Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* Tấm năng lượng mặt trời */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Tấm năng lượng mặt trời</Accordion.Header>
          <Accordion.Body>
            <Row className="bg-light p-2">
              <Col md={6}><strong>Công nghệ:</strong></Col>
              <Col md={6}>Polycrystalline</Col>
            </Row>
            <Row className="p-2">
              <Col md={6}><strong>Công suất:</strong></Col>
              <Col md={6}>45W</Col>
            </Row>
            <Row className="bg-light p-2">
              <Col md={6}><strong>Điện áp:</strong></Col>
              <Col md={6}>6V</Col>
            </Row>
            <Row className="p-2">
              <Col md={6}><strong>Kích thước:</strong></Col>
              <Col md={6}>770*360*17mm</Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* Pin lưu trữ */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Pin lưu trữ</Accordion.Header>
          <Accordion.Body>
            <Row className="bg-light p-2">
              <Col md={6}><strong>Công nghệ:</strong></Col>
              <Col md={6}>Lithium-Ion</Col>
            </Row>
            <Row className="p-2">
              <Col md={6}><strong>Dung lượng:</strong></Col>
              <Col md={6}>56.000mAh</Col>
            </Row>
            <Row className="bg-light p-2">
              <Col md={6}><strong>Điện áp:</strong></Col>
              <Col md={6}>3.2V</Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* Thông tin khác */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>Thông tin khác</Accordion.Header>
          <Accordion.Body>
            <Row className="bg-light p-2">
              <Col md={6}><strong>Thương hiệu:</strong></Col>
              <Col md={6}>Jindian</Col>
            </Row>
            <Row className="p-2">
              <Col md={6}><strong>Bảo hành:</strong></Col>
              <Col md={6}>2 năm</Col>
            </Row>
            <Row className="bg-light p-2">
              <Col md={6}><strong>Thời gian sáng:</strong></Col>
              <Col md={6}>12-14 giờ</Col>
            </Row>
            <Row className="p-2">
              <Col md={6}><strong>Chức năng:</strong></Col>
              <Col md={6}>Cảm biến tắt bật tự động, Remote điều khiển</Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
  );
}