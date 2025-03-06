import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import { CardCompany } from "../../components/CardCompany";
import { CardProductInformation } from "../../components/CardProductInformation";
import { ShoppingCart } from "lucide-react";
import { ProductImageGallery } from "../../components/ProductImageGallery";
import { useParams } from "react-router-dom";
import { useProductDetailContext } from "../../context/ProductProvider";
import { formatMoney } from "../../ultities/formatMoney";
import { formatNumberPer } from "../../ultities/formatNumberPer";
import { formatSlug } from "../../ultities/formatForLug";
import { useShoppingCart } from "../../context/ProductContext";

const ProductDetail = () => {
  // Lấy tham số từ URL
  const { productId, idDetail } = useParams();
  const { productList } = useProductDetailContext();
  const { increaseItemQuantity } = useShoppingCart();
  const product = productList.find((item) => item.id === Number(productId)) || null;
  const productVariantList = productList.find(
    (item) => item.id === Number(productId)
  )?.productVariant;
  const productVariant = productVariantList?.find(
    (item) => item.id === Number(idDetail)
  );
  const imageList = productVariantList?.find(
    (item) => item.id === Number(idDetail)
  )?.images;
  const percentNumber =
    (((productVariant?.oldprice ?? 0) - (productVariant?.newprice ?? 0)) /
      (productVariant?.oldprice ?? 1)) *
    100;

  return (
    <Container className="mt-4">
      <Row>
        {/* Hình ảnh sản phẩm */}
        <Col md={6}>
          <ProductImageGallery imageList={imageList || []} />
        </Col>

        {/* Thông tin sản phẩm */}
        <Col md={6}>
          <h3>
            {productList.find((item) => item.id === Number(productId))?.name}
          </h3>
          <p className="text-danger fw-bold fs-4">
            Giá: {formatMoney(productVariant?.oldprice ?? 0)}{" "}
            <del className="text-muted">
              {formatMoney(productVariant?.newprice ?? 0)}
            </del>{" "}
            (Giảm {formatNumberPer(percentNumber)})
          </p>

          {/* Lựa chọn dung lượng */}
          <div className="mb-3">
            <strong>Công Suất:</strong>
            {product?.productVariant?.map((variant) => (
              <Button
                key={variant.id}
                variant="outline-primary"
                className="ms-2"
                onClick={() =>
                  (window.location.href = `/den-nang-luong-mat-troi/${formatSlug(product.name)}/${product.id}/${variant.id}`)
                  
                }
              >
                {variant.wat}
              </Button>
            ))}
          </div>

          {/* Khuyến mãi */}
          <Card className="p-3 border-primary">
            <h5 className="text-primary">Đăng Ký Sớm – Nhận Ngay Ưu Đãi Đặc Biệt</h5>
            <ListGroup>
              <ListGroup.Item>
              🌞 Ưu đãi dành riêng cho khách hàng đặt trước!
              </ListGroup.Item>
              <ListGroup.Item>
              📢 Giảm ngay 300.000Đ cho 50 khách hàng đầu tiên đặt mua đèn năng lượng mặt trời
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
                  onClick={() => increaseItemQuantity(Number(productId))}
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
              onClick={()=> increaseItemQuantity(Number(productId))}
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
      <CardProductInformation />
    </Container>
  );
};

export default ProductDetail;
