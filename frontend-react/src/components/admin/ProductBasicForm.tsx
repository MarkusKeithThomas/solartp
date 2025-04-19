import { Form, Row, Col } from "react-bootstrap";
import { Product } from "../../context/ProductProvider";
import { useEffect, useState } from "react";
import { Category } from "../../type/admin/category";
import { getAllCategoriesApi } from "../../api/admin/categoryApi";

interface Props {
  product: Product;
  setProduct: (product: Product) => void;
}

export const ProductBasicForm = ({ product, setProduct }: Props) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getAllCategoriesApi();
      setCategories(data);
    } catch (err) {
      console.error("❌ Không lấy được danh mục:", err);
    }
  };

  return (
    <>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="VD: Đèn năng lượng mặt trời 25W"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Mã sản phẩm (SKU)</Form.Label>
            <Form.Control
              name="skuProduct"
              value={product.skuProduct}
              onChange={handleChange}
              placeholder="VD: TP25W"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Slug (URL)</Form.Label>
            <Form.Control
              name="slug"
              value={product.slug}
              onChange={handleChange}
              placeholder="VD: den-nang-luong-mat-troi-25w"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Công suất (Wattage)</Form.Label>
            <Form.Control
              name="wattage"
              value={product.wattage}
              onChange={handleChange}
              placeholder="VD: 25W, 50W, 100W"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Giá bán mới</Form.Label>
            <Form.Control
              name="newPrice"
              type="number"
              value={product.newPrice}
              onChange={handleChange}
              placeholder="Giá sau khuyến mãi"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Giá gốc</Form.Label>
            <Form.Control
              name="oldPrice"
              type="number"
              value={product.oldPrice}
              onChange={handleChange}
              placeholder="Giá niêm yết ban đầu"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Số lượng tồn kho</Form.Label>
            <Form.Control
              name="stockQuantity"
              type="number"
              value={product.stockQuantity}
              onChange={handleChange}
              placeholder="VD: 100"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Số lượng đã bán</Form.Label>
            <Form.Control
              name="soldQuantity"
              type="number"
              value={product.soldQuantity}
              onChange={handleChange}
              placeholder="Tự động tăng khi có đơn hàng"
              disabled
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Danh mục sản phẩm</Form.Label>
            <Form.Select
              name="categoryId"
              value={product.categoryId}
              onChange={(e) =>
                setProduct({ ...product, categoryId: Number(e.target.value) })
              }
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6} className="d-flex align-items-center pt-4">
          <Form.Check
            type="checkbox"
            label="Kích hoạt hiển thị"
            name="isActive"
            checked={product.isActive}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Mô tả chi tiết</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Viết mô tả chi tiết về sản phẩm, tính năng nổi bật, công dụng..."
        />
      </Form.Group>
    </>
  );
};
