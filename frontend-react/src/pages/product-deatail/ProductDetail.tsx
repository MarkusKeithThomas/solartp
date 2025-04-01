import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  Image,
} from "react-bootstrap";
import { CardCompany } from "../../components/CardCompany";
import { CardProductInformation } from "../../components/CardProductInformation";
import { ShoppingCart } from "lucide-react";
import { ProductImageGallery } from "../../components/ProductImageGallery";
import { useParams } from "react-router-dom";
import { useProductDetailContext } from "../../context/ProductProvider";
import { formatMoney } from "../../ultities/formatMoney";
import { useShoppingCart } from "../../context/ProductContext";
import { discountProduct } from "../../ultities/discountProduct";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>(); // Lấy slug từ URL
  const { productList } = useProductDetailContext();
  const productDetail = productList.find((item) => item.slug === slug);
  const imageList = productList.find((item) => item.slug === slug)?.images;
  const isThumb = productDetail?.images.find((item) => item.isThumbnail);


  // Lấy tham số từ URL
  const { increaseItemQuantity } = useShoppingCart();
  const {openCart} = useShoppingCart();
  return (
    <>

      <Container className="mt-4">
        <Row>
          {/* Hình ảnh sản phẩm */}
          <Col md={6}>
            <ProductImageGallery
              imageList={imageList || []}
                        />
          </Col>

          {/* Thông tin sản phẩm */}
          <Col md={6}>
            <h2>{productDetail?.name}</h2>
            <p className="text-danger fw-bold fs-4">
              Giá: {formatMoney(productDetail?.newPrice ?? 0)}{" "}
              <del className="text-muted">
                {formatMoney(productDetail?.oldPrice ?? 0)}
              </del>{" "}
              {productDetail?.oldPrice &&
                productDetail?.newPrice &&
                productDetail.oldPrice > 0 && (
                  <>
                    (Giảm{" "}
                    {discountProduct(
                      productDetail?.newPrice,
                      productDetail?.oldPrice
                    )}
                    %)
                  </>
                )}
            </p>

            <div className="mb-3">
              <strong>Công Suất:</strong>
              {productList?.map((item) => (
                <Button
                  key={item.id}
                  variant="outline-primary"
                  className="ms-2"
                  onClick={() =>
                    (window.location.href = `/den-nang-luong-mat-troi/${item.slug}`)
                  }
                >
                  {item.wattage}
                </Button>
              ))}
            </div>

            {/* Khuyến mãi */}
            <Card className="p-3 border-primary">
              <h5 className="text-primary">
                Đăng Ký Sớm – Nhận Ngay Ưu Đãi Đặc Biệt
              </h5>
              <ListGroup>
                <ListGroup.Item>
                  🌞 Ưu đãi dành riêng cho khách hàng đặt trước!
                </ListGroup.Item>
                <ListGroup.Item>
                  📢 Giảm ngay 300.000Đ cho 50 khách hàng đầu tiên đặt mua đèn
                  năng lượng mặt trời
                </ListGroup.Item>
                <ListGroup.Item>
                  🎁 Tặng ngay bộ pin sạc hoặc cáp nối dài khi mua từ 2 sản phẩm
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Row className="g-2 mt-1">
              {/* Nút Mua Ngay */}
              <Col xs={6}>
                <Button
                  href="/thanh-toan"
                  onClick={() => {
                    increaseItemQuantity(Number(productDetail?.id));
                  }}
                  variant="danger"
                  className="w-100 d-flex align-items-center justify-content-center"
                  style={{
                    borderRadius: "12px",
                    padding: "12px 0",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Mua Ngay
                </Button>
              </Col>

              {/* Nút Thêm vào giỏ */}
              <Col xs={6}>
                <Button
                  onClick={() =>
                    {increaseItemQuantity(Number(productDetail?.id));
                    openCart()
                    }
                  }
                  variant="outline-primary"
                  className="w-100 d-flex align-items-center justify-content-center"
                  style={{
                    borderRadius: "12px",
                    padding: "12px 0",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  <ShoppingCart size={20} className="me-2" />
                  Thêm vào giỏ
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <CardCompany />
        <h2 className="text-center mt-3">{productDetail?.name}</h2>
        <p className="mt-3 mb-3 bg-light">{productDetail?.description}</p>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ maxHeight: "30%" }}
        >
          <Image
            src={isThumb?.imageUrl || ""}
            alt={isThumb?.altText || "Ảnh sản phẩm"}
            fluid
            style={{
              maxHeight: "450px",
              objectFit: "contain",
            }}
          />
        </div>
        <CardProductInformation
          specificationGroups={productDetail?.specificationGroups}
        />
      </Container>
    </>
  );
};

export default ProductDetail;
