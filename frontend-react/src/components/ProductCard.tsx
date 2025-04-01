import { Card, Button, Badge } from "react-bootstrap";
import { useShoppingCart } from "../context/ProductContext";
import { Link } from "react-router-dom";
import { formatTitle } from "../ultities/formatTitle";
import { discountProduct } from "../ultities/discountProduct";

interface ProductProps {
  id: number;
  name: string;
  description: string;
  slug: string;
  image: string;
  priceOld: number;
  priceNew: number;
}

export function ProductCard({
  id,
  name,
  slug,
  image,
  priceOld,
  priceNew,
}: ProductProps) {
  const { increaseItemQuantity, getItemQuantity } = useShoppingCart();
  const discount = discountProduct(priceNew,priceOld);

  return (
    <Card key={id} className="shadow-sm border-0 rounded-4 product-card mt-2">
      {/* Huy hiệu giảm giá */}
      {discount > 0 && (
        <Badge className="position-absolute top-0 start-0 bg-danger text-white fs-6 rounded-end p-2 mt-2">
          {discount}% GIẢM
        </Badge>
      )}

      {/* Ảnh sản phẩm - Được bọc bởi Link */}
      <Link to={`/den-nang-luong-mat-troi/${slug}`} className="text-decoration-none">
        <Card.Img variant="top" src={image} className="product-image mt-3" />
      </Link>

      <Card.Body className="d-flex flex-column justify-content-between text-center p-3 card-body-fixed">
        {/* Tên sản phẩm - Được bọc bởi Link */}
        <Link to={`/den-nang-luong-mat-troi/${slug}`} className="text-decoration-none">
          <Card.Title className="fs-6 fw-bold product-title d-flex align-items-center justify-content-center">
            {formatTitle(name)}
          </Card.Title>
        </Link>
        {/* Giá cũ và giá mới */}
        <div className="d-flex flex-column justify-content-between price-container">
          <span className="text-decoration-line-through old-price" style={{ color: "red" }}>
            {priceOld.toLocaleString()}đ
          </span>
          <span className="text-black fw-bold new-price">
            {priceNew.toLocaleString()}đ
          </span>
        </div>

        {/* Nút thao tác */}
        <div className="d-flex flex-column align-items-center justify-content-between mt-2">
          {/* Nút So Sánh */}
          <div className="d-flex align-items-center">
            <p className="mb-0 fs-6 fw-bold me-2">So Sánh</p>
            <Button
              variant="link"
              className="text-primary d-flex align-items-center justify-content-center p-0"
              style={{
                width: "24px",
                height: "24px",
                border: "2px solid #00879E",
                borderRadius: "50%",
              }}
            >
              <i className="bi bi-plus fs-6"></i>
            </Button>
          </div>

          {/* Nút Thêm Vào Giỏ */}
          <div className="d-flex align-items-center justify-content-between">
            <Button
              onClick={(e) => {
                e.preventDefault(); // Ngăn Link chuyển trang khi bấm vào nút
                increaseItemQuantity(id);
              }}
              style={{
                width: "3.5rem",
                height: "3.5rem",
                position: "relative",
              }}
              variant="outline-yellow"
              className="rounded-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>
            </Button>

            <p className="fw-bold text-center mb-0 px-2 border rounded">
              {getItemQuantity(id)}
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}