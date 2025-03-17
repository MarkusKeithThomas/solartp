import { HelmetProvider } from "react-helmet-async";
import { Card, Col, Row } from "react-bootstrap";
import Seo from '../../components/Seo';
import newsItem from "../../assets/fakedata/newsitempost.json";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  slug?: string;
}

export function Post() {
  return (
    <HelmetProvider>
      <div className="container mt-4">
        <Row className="bg-light">
          {newsItem.map((item:NewsItem) => (
            <Col key={item.id} sm={12} md={6} lg={4} className="mb-3 d-flex">
              <Card className="shadow-sm h-100 d-flex flex-column">
                <Card.Img
                  className="flex-shrink-0"
                  variant="top"
                  src={item.image}
                  alt={item.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column flex-grow-1">
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text className="flex-grow-1">{item.description}</Card.Text>
                  <a href={item.url} className="btn btn-primary mt-auto">Xem Chi Tiết</a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Thêm SEO */}
        {newsItem.length > 0 && (
          <Seo
            title={newsItem[0].title}
            description={newsItem[0].description}
            image={newsItem[0].image}
            url={newsItem[0].url}
            date={newsItem[0].date}
          />
        )}
      </div>
    </HelmetProvider>
  );
}