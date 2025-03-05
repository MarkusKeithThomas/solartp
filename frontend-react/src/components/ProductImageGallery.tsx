import { Container, Row, Col, Image } from "react-bootstrap";
import { useState } from "react";
import imagedeafault from '../components/imgs/image.png'

type ProductGalleryProps = {
  id: number;
  nameUrl: string;
  nameAlt: string;
};

type ProductImageGalleryProps = {
  imageList: ProductGalleryProps[] | null;
};

export function ProductImageGallery({ imageList }: ProductImageGalleryProps) {
  const [mainImage, setMainImage] = useState(imagedeafault);

  return (
    <Container className="bg-light mb-2">
      {/* Hình ảnh chính */}
      <Col className="d-flex flex-column justify-content-center align-items-center">
        <div className="product-image-container">
          <Image src={mainImage} fluid className="main-image border rounded" />
        </div>

        {/* Hình ảnh nhỏ bên dưới */}
        <Row className="mt-3 d-flex justify-content-center">
          {imageList?.map((image) => (
            <Col key={image.id} xs={3} sm={2} md={2} className="p-1">
              <Image
                src={image.nameUrl}
                fluid
                className="thumbnail border rounded cursor-pointer"
                alt={image.nameAlt}
                onClick={() => setMainImage(image.nameUrl)} // Khi click đổi ảnh chính
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Container>
  );
}