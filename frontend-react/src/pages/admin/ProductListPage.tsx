// ProductListPage.tsx
import { useEffect } from "react";
import { Table, Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProductAdmin } from "../../context/admin/ProductAdminProvider";

const ProductListPage = () => {
  const navigate = useNavigate();
  const { products,reloadProducts, isLoading } = useProductAdmin();

  useEffect(() => {
    reloadProducts();
  }, []);

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>📦 Danh sách sản phẩm</span>
        <Button variant="success" onClick={() => navigate("/admin/products/add")}>+ Thêm sản phẩm đơn</Button>
        <Button variant="success" onClick={() => navigate("/admin/products/excel")}>+ Thêm sản phẩm hàng loạt</Button>
      </Card.Header>
      <Card.Body>
        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table responsive bordered hover>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>SKU</th>
                <th>Giá mới</th>
                <th>Giá cũ</th>
                <th>Tồn kho</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <img
                      src={p.images.find((i) => i.isThumbnail)?.imageUrl || p.images[0]?.imageUrl}
                      alt={p.name}
                      style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.skuProduct}</td>
                  <td>{p.newPrice?.toLocaleString()}đ</td>
                  <td className="text-decoration-line-through text-muted">{p.oldPrice?.toLocaleString()}đ</td>
                  <td>{p.stockQuantity}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                    >
                      ✏️ Sửa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductListPage;