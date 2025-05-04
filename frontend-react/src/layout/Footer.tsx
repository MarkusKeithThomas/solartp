import { Container, Row, Col } from "react-bootstrap";
import "../styles/custom.css"; // Import CSS tùy chỉnh

export function Footer() {
  return (
    <footer className="footer bg-light mt-5 py-4">
      <Container className="text-dark">
        <Row className="gap-5 justify-content-center">
          {/* Cột 1: Tổng đài hỗ trợ */}
          <Col md={3} className="justify-content-center">
            <h5 className="fw-bold">Tổng đài hỗ trợ</h5>
            <p>
              Gọi mua:{" "}
              <a href="tel:084972769364" className="text-primary">
                (+84) 972769364
              </a>{" "}
              (8:00 - 18:00)
            </p>
            <p>
              Khiếu nại:{" "}
              <a href="tel:084972769364" className="text-primary">
                (+84) 972769364
              </a>{" "}
              (8:00 - 18:00)
            </p>
          </Col>

          {/* Cột 2: Giới thiệu công ty */}
          <Col md={3} className="justify-content-center">
            <h5 className="fw-bold">Công ty TNHH MTV SOLAR TP</h5>
            <p>
              <a href="#" className="footer-link">
                Địa chỉ: 92 Nam Kỳ Khởi Nghĩa, Bến Nghé , Quận 1, Thành phố Hồ
                Chí Minh
              </a>
            </p>
          </Col>

          {/* Cột 3: Thông tin khác */}
          <Col md={3} className="justify-content-center">
            <h5 className="fw-bold">Trụ Sở Chính</h5>
            <p>
              <a href="#" className="footer-link">
                Trụ sở: 267 Serangoon Ave 3, #01-37, Singapore
              </a>
            </p>
          </Col>
        </Row>

        {/* Mạng xã hội */}
      </Container>
    </footer>
  );
}
