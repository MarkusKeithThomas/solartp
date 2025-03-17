import { HelmetProvider } from "react-helmet-async";
import { Card, Col, Row } from "react-bootstrap";
import Seo from "../../components/Seo";
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
      {newsItem.map((item: NewsItem) => (
        <Row key={item.id} className="bg-light p-1 w-75 mx-auto" style={{minWidth: "380px"}}>
          <Col
            sm={12}
            md={12}
            lg={12}
            className="mb-3 d-flex justify-content-center"
          >
            <Card className="news-card border-0 shadow-sm p-2">
              <Row className="align-items-center">
                {/* Hình ảnh trên desktop - nằm bên trái */}
                <Col xs={12} md={4} className="d-none d-md-block">
                  <Card.Img
                    src={item.image}
                    className="rounded img-fluid"
                    alt={item.title}
                  />
                </Col>

                {/* Nội dung tin tức */}
                <Col xs={12} md={8}>
                  <Card.Body>
                    <Card.Title className="fw-bold">{item.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                </Col>

                {/* Hình ảnh trên mobile - nằm dưới nội dung */}
                <Col xs={12} className="d-block d-md-none">
                  <Card.Img
                    src={item.image}
                    className="rounded img-fluid mt-2"
                    alt={item.title}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ))}

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
    </HelmetProvider>
  );
}
