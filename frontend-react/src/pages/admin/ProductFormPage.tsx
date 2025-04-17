import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useProductAdmin } from "../../context/admin/ProductAdminProvider";
import { Product } from "../../context/ProductProvider";
const initialProduct: Product = {
  id: 0,
  skuProduct: "",
  name: "",
  slug: "",
  description: "",
  newPrice: 0,
  oldPrice: 0,
  stockQuantity: 0,
  soldQuantity: 0,
  wattage: "",
  categoryId: 0,
  isActive: true,
  images: [],
  specificationGroups: {},
};

const ProductFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { addProduct, updateProduct, getProductById } = useProductAdmin();

  const [product, setProduct] = useState<Product>(initialProduct);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      getProductById(Number(id))
        .then((res) => {
          if (res) setProduct(res);
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProduct(product);
      } else {
        await addProduct(product);
      }
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Lỗi khi lưu sản phẩm:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Card>
      <Card.Header>{isEdit ? "✏️ Cập nhật sản phẩm" : "➕ Thêm sản phẩm mới"}</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>SKU</Form.Label>
                <Form.Control
                  name="skuProduct"
                  value={product.skuProduct}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Giá mới</Form.Label>
                <Form.Control
                  name="newPrice"
                  type="number"
                  value={product.newPrice}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Giá cũ</Form.Label>
                <Form.Control
                  name="oldPrice"
                  type="number"
                  value={product.oldPrice}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={() => navigate("/admin/products")}>Huỷ</Button>
            <Button type="submit" variant="primary">
              {isEdit ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProductFormPage;
