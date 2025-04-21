import { Button, Col, Row, Image } from "react-bootstrap";
import { HomeSlider } from "../components/HomeSlider";
import "../styles/custom.css"; // Kiểm tra đúng đường dẫn
import { ProductCard } from "../components/ProductCard";
import { NewsCard } from "../components/NewsCard";
import { useArticleContext } from "../context/ArticleProvider";
import { formatContentForPost } from "../ultities/formatContentForCardPost";
import { useProductDetailContext } from "../context/ProductProvider";
import { useState } from "react";

export function Home() {
  const { productList, nextPage, isMore, superSaleList, isLoading } =
    useProductDetailContext();

  const { shortArticles } = useArticleContext();
  const [hotGiamProduct, setHotGiamProduct] = useState(4);

  const productDiscountOver15 = productList.filter((product) => {
    if (!product.oldPrice || !product.newPrice || product.oldPrice === 0)
      return false;
    const discount =
      ((product.oldPrice - product.newPrice) / product.oldPrice) * 100;
    return discount > 15;
  });

  return (
    <>
      <HomeSlider />
      <div className="container mt-3 mb-3 text-center">
        <h2>Đèn năng lượng mặt trời Solar TP</h2>
        <h4>Nhà cung cấp hàng đầu Việt Nam 🇻🇳</h4>
      </div>
      <div className="bg-light mt-5">
        {productList && productList.length > 0 && (
          <>
            <div className="mb-1">
              <span className="bg-danger text-white px-3 py-1 rounded shadow-lg fw-bold fs-4 mb-3">
                Sản Phẩm Giảm Sốc
              </span>
            </div>
            <Row className="mt-2">
              {superSaleList
                .slice(0, hotGiamProduct)
                .filter((product) => product.id !== undefined)
                .map((product) => (
                  <Col key={product.id} xs={6} md={6} lg={3} className="gx-1">
                    <ProductCard
                      id={product.id!}
                      description={product.description}
                      name={product.name}
                      slug={product.slug}
                      image={
                        product.images.find((item) => item.isThumbnail)
                          ?.imageUrl || ""
                      }
                      priceOld={product.oldPrice}
                      priceNew={product.newPrice}
                    />
                  </Col>
                ))}
            </Row>
            <div className="text-center">
              {productDiscountOver15.length > hotGiamProduct && (
                <Button
                  onClick={() => setHotGiamProduct((prev) => prev + 4)}
                  variant="link"
                  className="text-primary"
                >
                  Xem thêm sản phẩm ▼
                </Button>
              )}
            </div>
          </>
        )}
      </div>
      <div>
        <Image
          src="/imgs/discount_solar_tp.webp"
          alt="Banner giảm giá đèn năng lượng mặt trời - SolarTP"
          loading="lazy"
          className="img-fluid rounded-3 mt-4 w-100"
          style={{ maxWidth: "2000px", height: "auto" }}
        />
      </div>

      <div className="bg-light mt-5">
        <span className="bg-primary text-white px-3 py-1 rounded shadow-lg fw-bold fs-4 mb-3 mt-3">
          Sản Phẩm Bán Chạy
        </span>
        <Row className="mt-2">
          {productList.map((product) => (
            <Col key={product.id} xs={6} md={6} lg={3} className="gx-1">
              <ProductCard
                id={product.id ?? 0}
                description={product.description}
                name={product.name}
                slug={product.slug}
                image={
                  product.images.find((item) => item.isThumbnail)?.imageUrl ||
                  ""
                }
                priceOld={product.oldPrice}
                priceNew={product.newPrice}
              />
            </Col>
          ))}
        </Row>
        <div className="text-center">
          <Button
            variant="link"
            className="text-primary fw-bold"
            disabled={isLoading}
            onClick={() => nextPage()}
          >
            {isLoading ? "Đang tải thêm" : ""}
            {isMore ? "Trang cuối" : "Xem thêm sản phẩm ▼"}
          </Button>
        </div>
      </div>

      <div className="bg-light p-2 mt-2 container">
        {/* Tiêu đề */}
        <h2 className=" fw-bold mb-2 mt-2">Bản tin</h2>
        {/* Danh sách bài viết */}
        <Row className="gx-0 gy-2 p-0">
          {shortArticles.slice(0, 10).map((news) => (
            <Col xs={12} md={4} lg={6} key={news.id}>
              <NewsCard
                id={news.id}
                title={news.title}
                image={news.image1Url} // Đổi thành `image` nếu cần
                description={formatContentForPost(news.content11)} // Đổi thành `description` nếu cần
                slug={news.slugTitle}
              />{" "}
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
