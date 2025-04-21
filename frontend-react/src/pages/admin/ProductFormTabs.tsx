import { useState, useEffect } from "react";
import { Tabs, Tab, Button, Spinner, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useProductAdmin } from "../../context/admin/ProductAdminProvider";
import { Product } from "../../context/ProductProvider";
import ProductImageForm from "../../components/admin/ProductImageForm";
import ProductSpecForm from "../../components/admin/ProductSpecForm";
import { ProductBasicForm } from "../../components/admin/ProductBasicForm";
import {
  updateProductFields,
  updateProductImages,
  updateProductSpecifications,
} from "../../api/admin/productApi";

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

const ProductFormTabs = () => {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { addProduct, getProductById } = useProductAdmin();

  const [product, setProduct] = useState<Product>(initialProduct);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      getProductById(Number(id))
        .then((res) => {
          if (res) {
            setProduct(res);
          }
        })
        .catch((err) => console.error("❌ Lỗi khi load sản phẩm:", err))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, getProductById]);

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        setIsEditing(false);
        if (product.id !== undefined) {
          await updateProductFields(product.id, product);
          await updateProductImages(product.id, product.images);
          await updateProductSpecifications(
            product.id,
            product.specificationGroups
          );
        }
      } else await addProduct(product);

      navigate("/admin/products");
    } catch (err) {
      setIsEditing(true);
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
      <Card.Header>
        {isEdit ? "✏️ Cập nhật sản phẩm" : "➕ Thêm sản phẩm mới"}
      </Card.Header>
      <Card.Body>
        <Tabs defaultActiveKey="basic" className="mb-3">
          <Tab eventKey="basic" title="Thông tin cơ bản">
            <ProductBasicForm product={product} setProduct={setProduct} />
          </Tab>
          <Tab eventKey="images" title="Ảnh sản phẩm">
            <ProductImageForm
              productImages={product.images}
              onImagesChange={(newImages) =>
                setProduct((prev) => ({ ...prev, images: newImages }))
              }
            />
          </Tab>
          <Tab eventKey="specs" title="Thông số kỹ thuật">
            <ProductSpecForm
              isEditing={isEditing}
              product={product}
              setProduct={setProduct}
            />
          </Tab>
        </Tabs>

        <div className="text-end mt-3">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => navigate("/admin/products")}
          >
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEdit ? "Cập nhật" : "Thêm mới"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductFormTabs;
