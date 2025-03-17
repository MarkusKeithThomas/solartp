import { Col,  Container,  Row } from "react-bootstrap";


export function CheckLayout() {
  
return(
    <Container>
      <Row className="gy-2 gx-2"> {/* gy-3: khoảng cách giữa các hàng */}
        <Col xs={12} md={4} className="bg-primary text-white p-3 text-center">
          <h3>📰 Bài viết 1</h3>
          <p>Nội dung bài viết 1...</p>
        </Col>
        <Col xs={12} md={4} className="bg-success text-white p-3 text-center">
          <h3>📢 Bài viết 2</h3>
          <p>Nội dung bài viết 2...</p>
        </Col>
        <Col xs={12} md={4} className="bg-danger text-white p-3 text-center">
          <h3>🎯 Bài viết 3</h3>
          <p>Nội dung bài viết 3...</p>
        </Col>
      </Row>
      </Container>

)
}
