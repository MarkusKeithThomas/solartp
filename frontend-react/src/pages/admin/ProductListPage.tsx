import { useEffect } from "react";
import { Button, Card, Spinner, Table } from "react-bootstrap";
import { useProductAdmin } from "../../context/admin/ProductAdminProvider";
import { useNavigate } from "react-router-dom";

const ProductListPage = () => {
  const navigate = useNavigate();
  const {
    products,
    isLoading,
    removeProduct,
    reloadProducts,
  } = useProductAdmin();

  useEffect(() => {
    reloadProducts();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) {
      await removeProduct(id);
    }
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">📦 Danh sách sản phẩm</h5>
        <Button variant="success" onClick={() => navigate("/admin/products/add")}>+ Thêm mới</Button>
      </Card.Header>
      <Card.Body>
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table hover responsive>
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>SKU</th>
                <th>Giá mới</th>
                <th>Giá cũ</th>
                <th>Tồn kho</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.images.find(i => i.isThumbnail)?.imageUrl || "https://via.placeholder.com/50"}
                      alt={p.name}
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.skuProduct}</td>
                  <td>{p.newPrice.toLocaleString()}đ</td>
                  <td>{p.oldPrice.toLocaleString()}đ</td>
                  <td>{p.stockQuantity}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(p.id)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      Xoá
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