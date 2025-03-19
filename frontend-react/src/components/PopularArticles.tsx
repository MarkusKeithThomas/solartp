import { Card, Row, Col } from "react-bootstrap";
import { useArticleContext } from "../context/ArticleProvider";
import '../styles/custom.css'

export function PopularArticles() {
  const {shortArticles} = useArticleContext();
  return (
    <div className="popular-articles">
      <h4 className="fw-bold border-bottom pb-2 mt-2" style={{color:"black"}}>Xem nhiều</h4>
      {shortArticles.map((article) => (
        <Card key={article.id} className="border-0 gx-1 gy-0 mb-3 popular-card">
          <Row className="gx-2 gy-2">
            <Col xs={4}>
              <a href="/bai-viet">
                <Card.Img
                  src={article.image2Url}
                  alt={article.altImage2}
                  className="img-fluid rounded ms-1"
                  style={{
                    width: "100%",
                    height: "80px",
                    objectFit: "contain",
                  }}
                  loading="lazy"

                />
              </a>
            </Col>
            <Col xs={8}>
              <Card.Body className="p-1 text-start">
                <a href="/bai-viet" className="popular-title-link fw-bold fs-6" style={{ textDecoration: "none",color: "black" }}>
                  {article.title}
                </a>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
}