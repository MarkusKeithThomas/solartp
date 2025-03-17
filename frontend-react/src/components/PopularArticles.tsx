import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaComment } from "react-icons/fa";

interface Article {
  id: number;
  title: string;
  image: string;
  url: string;
  comments?: number;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Bạch tuộc đực đầu độc bạn tình để tránh bị ăn thịt",
    image: "/fakeimags/news-1.jpg",
    url: "/bai-viet/bach-tuoc-duc-dau-doc-ban-tinh",
  },
  {
    id: 2,
    title: "Hiện tượng tạo ra ảo ảnh tàu ma giữa biển",
    image: "/fakeimags/news-1.jpg",
    url: "/bai-viet/ao-anh-tau-ma",
  },
  {
    id: 3,
    title: "Bên trong Trung tâm điều khiển và vận hành vệ tinh Việt Nam",
    image: "/fakeimags/news-1.jpg",
    url: "/bai-viet/trung-tam-ve-tinh-vn",
  },
  {
    id: 4,
    title: "Trung Quốc phát triển chip không cần silicon",
    image: "/fakeimags/news-1.jpg",
    url: "/bai-viet/chip-khong-can-silicon",
    comments: 86,
  },
  {
    id: 5,
    title: "Vụ nổ tàu Starship ảnh hưởng thế nào tới khai thác Mặt Trăng?",
    image: "/fakeimags/news-1.jpg",
    url: "/bai-viet/starship-no",
    comments: 19,
  },
];

export function PopularArticles() {
  return (
    <div className="popular-articles">
      <h4 className="fw-bold border-bottom pb-2 mt-2" style={{color:"black"}}>Xem nhiều</h4>
      {articles.map((article) => (
        <Card key={article.id} className="border-0 gx-1 gy-0 mb-3 popular-card">
          <Row className="gx-2 gy-2">
            <Col xs={4}>
              <a href={article.url}>
                <Card.Img
                  src={article.image}
                  alt={article.title}
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
                <a href={article.url} className="popular-title-link fw-bold fs-6" style={{ textDecoration: "none",color: "black" }}>
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