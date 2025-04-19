// src/pages/admin/UploadProductExcelPage.tsx
import { useState } from "react";
import { Card, Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const UploadProductExcelPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!file) {
      setErrorMessage("❌ Vui lòng chọn file Excel (.xlsx)");
      return;
    }

    const formData = new FormData();
    formData.append("fileProduct", file);

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/products/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setSuccessMessage("✅ Tải file thành công. Đã thêm " + response.data.data.length + " sản phẩm!");
    } catch (err: any) {
      setErrorMessage("❌ Lỗi khi tải file: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: 600 }} className="py-4">
      <Card>
        <Card.Header>📤 Thêm sản phẩm hàng loạt bằng Excel</Card.Header>
        <Card.Body>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Chọn file Excel (.xlsx)</Form.Label>
              <Form.Control
                type="file"
                accept=".xlsx"
                onChange={(e) => setFile((e.target as HTMLInputElement).files?.[0] || null)}
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Đang tải...
                </>
              ) : (
                "Tải lên và thêm sản phẩm"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UploadProductExcelPage;