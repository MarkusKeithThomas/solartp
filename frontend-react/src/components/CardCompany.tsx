import { Card, Row, Col } from "react-bootstrap";
import { CheckCircle, Box, RefreshCw } from "lucide-react";

export function CardCompany() {
  return (
    <Card className=" bg-light p-4 shadow-sm border-0 mt-4">
      <Card.Body>
        <h5 className="fw-bold">Solar TP Cam Kết</h5>
        <Row className="mt-3">
          <Col xs={12} md={6} className="d-flex align-items-start mb-3">
            <Box className="text-primary me-2" size={24} />
            <p className="mb-0">Sản phẩm nguồn gốc xuất xứ rõ ràng </p>
          </Col>
          <Col xs={12} md={6} className="d-flex align-items-start mb-3">
            <Box className="text-primary me-2" size={24} />
            <p className="mb-0">Công ty nhập khẩu trực tiếp tại nhà máy</p>
          </Col>
          <Col xs={12} md={6} className="d-flex align-items-start mb-3">
            <RefreshCw className="text-primary me-2" size={24} />
            <p className="mb-0">
              Bảo hành 2 - 3 năm, đổi trả trong 30 ngày đầu{" "}
              <a href="/lien-he" className="text-primary fw-bold">
                Xem chi tiết
              </a>
            </p>
          </Col>
          <Col xs={12} md={6} className="d-flex align-items-start mb-3">
            <CheckCircle className="text-primary me-2" size={24} />
            <p className="mb-0">
              Luôn được kiểm tra chất lượng trước khi bàn giao{" "}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
