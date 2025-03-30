import { Container, Row, Col, Image } from "react-bootstrap";
import imageDefault from "../components/imgs/image.png";
import { useEffect, useState } from "react";

type ProductGalleryProps = {
  id: number;
  imageUrl: string;
  altText: string;
  isThumbnail: boolean;
  displayOrder: number;
};

type ProductImageGalleryProps = {
  imageList: ProductGalleryProps[] | null;
  productImageRef?: React.RefObject<HTMLImageElement | null>; // ✅ sửa tại đây
};

export function ProductImageGallery({
  imageList,
  productImageRef,
}: ProductImageGalleryProps) {
  const [mainImage, setMainImage] = useState<string>(imageDefault);

  useEffect(() => {
    if (imageList && imageList.length > 0) {
      const thumb = imageList.find((img) => img.isThumbnail);
      setMainImage(thumb?.imageUrl || imageList[0].imageUrl);
    } else {
      setMainImage(imageDefault);
    }
  }, [imageList]);

  return (
    <Container className="bg-light mb-2">
      <Col className="d-flex flex-column justify-content-center align-items-center">
        <div className="product-image-container">
          <Image
            src={mainImage}
            fluid
            className="main-image border rounded"
            ref={productImageRef} // ✅ ref gắn vào ảnh chính
            alt="Ảnh sản phẩm chính"
          />
        </div>

        {/* Hình ảnh nhỏ bên dưới */}
        <Row className="mt-3 d-flex justify-content-center">
          {imageList?.map((image) => (
            <Col key={image.id} xs={3} sm={2} md={2} className="p-1">
              <Image
                src={image.imageUrl}
                fluid
                className="thumbnail border rounded cursor-pointer"
                alt={image.altText}
                onClick={() => setMainImage(image.imageUrl)}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Container>
  );
}