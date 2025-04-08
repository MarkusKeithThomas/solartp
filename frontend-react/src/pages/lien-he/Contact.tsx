import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";

export function Contact() {
  return (
    <Container className="py-5">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-primary fw-bold">
          Solar TP – Dẫn Đầu Giải Pháp Năng Lượng Mặt Trời
        </h1>
        <p className="text-muted fs-5">
          🌞 Tiết Kiệm – Bền Vững – Tương Lai Xanh
        </p>
      </div>

      {/* Tại sao chọn Solar TP */}
      <section className="mt-5">
        <h2 className="text-center text-dark fw-bold">
          🔥 Tại sao chọn Solar TP?
        </h2>
        <Row className="mt-4">
          {[
            "Sản phẩm chính hãng 100% – Giấy tờ, nguồn gốc rõ ràng",
            "Giá cả cạnh tranh – Chính sách giá tốt nhất thị trường",
            "Bảo hành lâu dài – Chăm sóc khách hàng 24/7",
            "Đội ngũ kỹ thuật chuyên nghiệp – Hỗ trợ tận tâm",
            "Công nghệ tiên tiến – Hiệu suất cao, tiết kiệm điện",
            "Hơn 5,000 khách hàng hài lòng trên toàn quốc",
          ].map((text, index) => (
            <Col md={4} key={index} className="mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  <FaCheckCircle className="text-success me-2" />
                  <span>{text}</span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Sản phẩm & Dịch vụ */}
      <section className="mt-5">
        <h2 className="text-center text-dark fw-bold">📌 Sản phẩm & Dịch vụ</h2>
        <Row className="mt-4">
          {[
            {
              title: "🌞 Đèn năng lượng mặt trời",
              details: ["Đèn pha", "Đèn đường", "Đèn sân vườn"],
            },
            {
              title: "🔋 Hệ thống điện mặt trời",
              details: ["Điện mặt trời áp mái", "Điện mặt trời doanh nghiệp"],
            },
            {
              title: "🔧 Dịch vụ lắp đặt & bảo trì",
              details: ["Lắp đặt hệ thống", "Bảo trì, sửa chữa"],
            },
          ].map((item, index) => (
            <Col md={4} key={index} className="mb-3">
              <Card
                className="shadow-sm border-primary"
                style={{ height: "150px" }}
              >
                <Card.Body>
                  <h5 className="text-primary fw-bold">{item.title}</h5>
                  <ul className="list-unstyled text-muted mt-2">
                    {item.details.map((detail, i) => (
                      <li key={i}>✅ {detail}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Thành tựu & Chứng nhận */}
      <section className="mt-5 bg-light p-4 rounded">
        <h2 className="text-center text-dark fw-bold">
          🏆 Thành tựu & Chứng nhận
        </h2>
        <ul className="mt-3 text-muted">
          <li>✅ 2020: Giấy phép kinh doanh từ Sở KH&ĐT TP. HCM.</li>
          <li>
            ✅ Top 9+ thương hiệu hợp tác với các hãng đèn năng lượng mặt trời
            uy tín.
          </li>
          <li>
            ✅ Top 10 đơn vị phân phối đèn năng lượng mặt trời hàng đầu Việt
            Nam.
          </li>
        </ul>
      </section>
      <img
        className="img-fluid d-block mx-auto"
        src="src/components/imgs/dien-mat-troi-ho-gia-dinh.jpg"
        alt="Điện Mặt Trời Hộ Gia Đình"
      />
      <img
        className="img-fluid d-block mx-auto mt-4"
        src="src/components/imgs/dien-nang-luong-mat-troi-cho-ho-gia-dinh-e1739460407174.jpg"
        alt="Điện Mặt Trời Hộ Gia Đình"
      />
      <img
        className="img-fluid d-block mx-auto mt-4"
        src="src/components/imgs/Giai-phap-nang-luong-mat-troi-cho-ho-gia-dinh.jpg"
        alt="Điện Mặt Trời Hộ Gia Đình"
      />
      <img
        className="img-fluid d-block mx-auto mt-4"
        src="src/components/imgs/thanh long.jpg"
        alt="Điện Mặt Trời Hộ Gia Đình"
      />

      <img
        className="img-fluid d-block mx-auto mt-4"
        src="src/components/imgs/thiet-ke-dien-mat-troi-cho-gia-dinh-nhu-the-nao-cho-hop-ly-hieu-qua.png"
        alt="Điện Mặt Trời Hộ Gia Đình"
      />

      {/* Thông tin liên hệ */}
      <section className="mt-5 bg-primary text-white p-4 rounded text-center">
        <h2 className="fw-bold">📍 Liên hệ ngay</h2>
        <p>
          <FaMapMarkerAlt className="me-2" /> 320/10 Hà Huy Giáp, P. Thạnh Lộc,
          Quận 12, TP. HCM
        </p>
        <p>
          <FaPhone className="me-2" /> 0972 769 364
        </p>
        <p>
          <FaEnvelope className="me-2" /> vn@solartp.com | cskh@solartp.com
        </p>
        <p>
          <FaGlobe className="me-2" />{" "}
          <a href="https://solartp.vn" className="text-white fw-bold">
            solartp.vn
          </a>
        </p>
        <Button
          href="tel:0972769364"
          variant="light"
          className="fw-bold mt-3 px-4 py-2"
        >
          📞 GỌI NGAY
        </Button>
      </section>
    </Container>
  );
}
