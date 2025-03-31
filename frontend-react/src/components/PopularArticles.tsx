import { Card, Row, Col } from "react-bootstrap";
import "../styles/custom.css";
import { Link } from "react-router-dom";
interface ArticlePopu {
  id: number;
  title: string;
  image2Url: string;
  altImage2: string;
  slugTitle: string;
}
interface PopularArticlesProps {
  articles?: ArticlePopu[];
}

export function PopularArticles({ articles }: PopularArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }
  return (
    <div className="popular-articles">
      <h4
        className="fw-bold border-bottom pb-2 mt-2"
        style={{ color: "black" }}
      >
        Xem nhiều
      </h4>
      {articles?.map((article) => (
        <Link key={article.id} to={`/bai-viet/${article.slugTitle}`}>
          <Card className="border-0 gx-1 gy-0 mb-3 popular-card">
            <Row className="gx-2 gy-2">
              <Col xs={4}>
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
              </Col>
              <Col xs={8}>
                <Card.Body className="p-1 text-start">
                  <div
                    className="popular-title-link fw-bold fs-6"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {article.title}
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Link>
      ))}
    </div>
  );
}
