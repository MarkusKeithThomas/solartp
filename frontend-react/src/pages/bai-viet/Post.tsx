import { Card, Col, Row } from "react-bootstrap";
import { NewsCard } from "../../components/NewsCard";
import newsItem from '../../assets/fakedata/newsitem.json'

export function Post() {
  return (
    <div>
      <Row className="bg-light mt-3">
        {newsItem.map((item) => (
          <Col key={item.id} sm={6} md={6} lg={3} className="mt-3">
            <NewsCard {...item}
            />
          </Col>
        ))}

      </Row>
    </div>
  )
}