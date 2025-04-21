import { Image } from "../../context/ProductProvider";
import {
  Button,
  Form,
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

interface Props {
  productImages: Image[];
  onImagesChange: (images: Image[]) => void; // truyền props từ cha
}

const ProductImageForm = ({ productImages, onImagesChange }: Props) => {
  const handleAddImage = () => {
    if (productImages.length >= 6) return;
    const newImages = [
      ...productImages,
      {
        id: Date.now(), // hoặc Math.random()
        imageUrl: "",
        altText: "",
        isThumbnail: false,
        displayOrder: productImages.length + 1,
      },
    ];
    onImagesChange(newImages);
  };

  const handleImageChange = (
    index: number,
    field: keyof Image,
    value: any
  ) => {
    const updated = [...productImages];
    updated[index] = { ...updated[index], [field]: value };
    onImagesChange(updated);
  };

  const handleRemove = (index: number) => {
    const updated = [...productImages];
    updated.splice(index, 1);
    onImagesChange(updated);
  };

  const setAsThumbnail = (index: number) => {
    const updated = productImages.map((img, i) => ({
      ...img,
      isThumbnail: i === index,
    }));
    onImagesChange(updated);
  };

  return (
    <Card className="p-3">
      <div className="mb-3">
        <strong>📸 Hình ảnh sản phẩm (Tối đa 6 ảnh)</strong>
      </div>

      <Row className="g-3">
        {productImages.map((img, index) => (
          <Col key={index} md={3}>
            <Card className="p-2 border">
              <Form.Group className="mb-2">
                <Form.Label>Ảnh xem trước</Form.Label>
                <div className="text-center mb-2">
                  {img.imageUrl ? (
                    <Card.Img
                      src={img.imageUrl}
                      alt={img.altText || ""}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: 150,
                        objectFit: "contain",
                        borderRadius: 4,
                      }}
                    />
                  ) : (
                    <div className="text-muted small fst-italic">Chưa có ảnh</div>
                  )}
                </div>
                <Form.Control
                  placeholder="Dán URL ảnh tại đây..."
                  value={img.imageUrl}
                  onChange={(e) =>
                    handleImageChange(index, "imageUrl", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Alt text</Form.Label>
                <Form.Control
                  value={img.altText}
                  onChange={(e) =>
                    handleImageChange(index, "altText", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Check
                type="radio"
                label="Ảnh bìa"
                checked={img.isThumbnail}
                onChange={() => setAsThumbnail(index)}
              />

              <div className="text-end mt-2">
                <OverlayTrigger overlay={<Tooltip>Xoá ảnh</Tooltip>}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemove(index)}
                  >
                    <Trash />
                  </Button>
                </OverlayTrigger>
              </div>
            </Card>
          </Col>
        ))}

        {productImages.length < 6 && (
          <Col md={3}>
            <Button
              variant="outline-secondary"
              className="w-100 h-100 d-flex align-items-center justify-content-center"
              style={{ minHeight: 150 }}
              onClick={handleAddImage}
            >
              + Thêm ảnh ({productImages.length}/6)
            </Button>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default ProductImageForm;