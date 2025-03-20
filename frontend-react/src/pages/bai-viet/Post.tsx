import { HelmetProvider } from "react-helmet-async";
import { Card, Col, Row } from "react-bootstrap";
import Seo from "../../components/Seo";
import { PopularArticles } from "../../components/PopularArticles";
import { useArticleContext } from "../../context/ArticleProvider";
import { formatTitle } from "../../ultities/formatTitle";
import { formatContentForPost } from "../../ultities/formatContentForCardPost";
import { Link } from "react-router-dom";

export function Post() {
  const { articles } = useArticleContext();
  console.log(articles[0].slugTitle);

  return (
    <HelmetProvider>
      <Row className="w-75 mx-auto" style={{ minWidth: "100%" }}>
        <h1 className="text-center ms-0">Nội Dung HOT Hôm Nay</h1>

        {/* Cột chứa danh sách bài viết */}
        <Col lg={8}>
          {articles.map((item) => (
            <Row key={item.id} className="bg-light p-1">
              <Col
                sm={12}
                md={12}
                lg={12}
                className="mb-3 d-flex justify-content-center"
              >
                  <Link to={`/bai-viet/${item.slugTitle}`} className="text-decoration-none text-dark w-100">

                <Card className="news-card border-0 shadow-sm p-2">
                  <Row className="align-items-center">
                    {/* Hình ảnh trên desktop - nằm bên trái */}
                    <Col xs={12} md={4} className="d-none d-md-block">
                      <Card.Img
                        src={item.image1Url}
                        className="rounded img-fluid"
                        style={{ maxHeight: "120px", objectFit: "contain" }}
                        alt={item.altImage1}
                      >

                      </Card.Img>
                    </Col>
                    {/* Nội dung tin tức */}
                    <Col xs={12} md={8}>
                      <Card.Body>
                        <Card.Title className="fw-bold">
                            {formatTitle(item.title)}
                          </Card.Title>
                        <Card.Text className="text-muted">
                          {formatContentForPost(item.content11)}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                    {/* Hình ảnh trên mobile - nằm dưới nội dung */}
                    <Col xs={12} className="d-block d-md-none">
                      <Card.Img
                        src={item.image1Url}
                        className="rounded img-fluid mt-2"
                        alt={item.altImage1}
                      />
                    </Col>
                  </Row>
                </Card>
                </Link>
              </Col>
            </Row>
          ))}
        </Col>

        {/* Cột bài viết phổ biến */}
        <Col lg={4} className="bg-light text-dark text-center">
          <PopularArticles />
        </Col>
      </Row>

      {/* Thêm SEO */}
      {articles.length > 0 && (
        <Seo
          title={articles[0].title}
          description={articles[0].header1}
          image={articles[0].altImage1}
          url={articles[0].image1Url}
          date={articles[0].dateCreate}
        />
      )}
    </HelmetProvider>
  );
}
