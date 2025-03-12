import { Button, Col, Row } from "react-bootstrap";
import { HomeSlider } from "../components/HomeSlider";
import "../styles/custom.css"; // Kiểm tra đúng đường dẫn
import { ProductCard } from "../components/ProductCard";
import productItem from "../assets/fakedata/dataitem.json";
import newsItem from "../assets/fakedata/newsitem.json";
import { NewsCard } from "../components/NewsCard";
import { useAuthContext } from "../context/AuthProvider";

export function Home() {
  const quantityHotSale = productItem.filter(
    (product) => product.tag === "hotsale"
  ).length;
  const productHotSale = productItem.filter(
    (product) => product.tag === "hotsale"
  );

  return (
    <>
      <HomeSlider />
      <div className="container mt-3 mb-3 text-center">
        <h2>Đèn năng lượng mặt trời Solar TP</h2>
        <h4>Nhà cung cấp hàng đầu Việt Nam 🇻🇳</h4>
      </div>
      <div className="bg-light mt-5">
        {quantityHotSale > 0 && (
          <>
          <div className="mb-1">
            <span className="bg-danger text-white px-3 py-1 rounded shadow-lg fw-bold fs-4 mb-3">
              Sản Phẩm Giảm Sốc
            </span>
            </div>
            <Row >
              {productHotSale.slice(0,4).map((product) => (
                <Col key={product.id} xs={6} md={6} lg={3}>
                  <ProductCard {...product} />
                </Col>
              ))}
            </Row>
            <div className="text-center">
              <Button variant="link" className="text-primary">
                Xem thêm sản phẩm ▼
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="bg-light mt-3">
        <span className="bg-primary text-white px-3 py-1 rounded shadow-lg fw-bold fs-4 mb-3 mt-3">
          Sản Phẩm Bán Chạy
        </span>
        <Row className="mt-2">
        {productItem.slice(0,4).map((product) => (
                <Col key={product.id} xs={6} md={6} lg={3}>
              <ProductCard {...product} />
            </Col>
          ))}
        </Row>
        <div className="text-center">
          <Button variant="link" className="text-primary fw-bold">
            Xem thêm sản phẩm ▼
          </Button>
        </div>
      </div>

      <div className="bg-light mt-3">
        <span className="bg-primary text-white px-3 py-1 rounded shadow-lg fw-bold fs-4 mb-3 mt-3">
          Thiết Bị Hệ Tống Điện Mặt Trời
        </span>
        <Row className="mt-2">
        {productItem.slice(0,4).map((product) => (
                <Col key={product.id} xs={6} md={6} lg={3}>
              <ProductCard {...product} />
            </Col>
          ))}
        </Row>
        <div className="text-center">
          <Button variant="link" className="text-primary fw-bold">
            Xem thêm sản phẩm ▼
          </Button>
        </div>
      </div>

      <div className="bg-light mt-3">
        <span className="bg-primary text-white px-3 py-1 rounded shadow-lg fw-bold fs-4 mb-3 mt-3">
          Gian Hàng Ưu Đãi
        </span>
        <Row className="mt-2">
        {productItem.slice(0,4).map((product) => (
                <Col key={product.id} xs={6} md={6} lg={3}>
              <ProductCard {...product} />
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button variant="link" className="text-primary fw-bold">
            Xem thêm sản phẩm ▼
          </Button>
        </div>
      </div>

      <div className="bg-light p-4 mt-5 container">
        {/* Tiêu đề */}
        <h2 className=" fw-bold mb-3 mt-3">Bản tin</h2>
        {/* Danh sách bài viết */}
        <Row className="g-3">
        {newsItem
            .filter((news) => news.tag === "today").slice(0,4)
            .map((news) => (
              <Col key={news.id} xs={6} md={6} lg={3}>
                <NewsCard {...news} />
              </Col>
            ))}
        </Row>

        {/* Nút "Xem thêm bài tin" */}
        <div className="text-center mt-3">
          <a href="/bai-viet" className="text-primary fw-bold">
            Xem thêm bài tin →
          </a>
        </div>
      </div>
    </>
  );
}
