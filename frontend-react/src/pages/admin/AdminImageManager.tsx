import { useEffect, useState } from "react";
import ImageGallery from "../../components/admin/ImageGallery";
import { getAllUrlApi, uploadImageApi } from "../../api/admin/imageApi";
import { Button, Form, Alert, Spinner } from "react-bootstrap";

const AdminImageManager = () => {
  const [imageData, setImageData] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    handleGetUrl();
  }, []);

  const handleGetUrl = async () => {
    try {
      const response = await getAllUrlApi();
      if (response !== null) {
        setImageData(response);
      }
    } catch (error) {
      console.error("Error fetching image URLs:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;
  
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("listfile", selectedFiles[i]); // 👈 khớp với backend
    }
  
    try {
      await uploadImageApi(formData);
      alert("✅ Tải ảnh thành công");
      await handleGetUrl();
    } catch (err) {
      console.error("❌ Upload error:", err);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Danh sách hình ảnh (mới nhất trên đầu)</h3>

      <Form.Group controlId="uploadImages" className="mb-3">
        <Form.Label>📤 Chọn ảnh mới để tải lên:</Form.Label>
        <Form.Control type="file" multiple onChange={handleFileChange} />
      </Form.Group>

      <Button onClick={handleUpload} disabled={uploading || !selectedFiles}>
        {uploading ? (
          <>
            <Spinner animation="border" size="sm" /> Đang tải...
          </>
        ) : (
          "Tải lên ảnh"
        )}
      </Button>

      {uploadSuccess && <Alert variant="success" className="mt-3">🎉 Tải ảnh thành công!</Alert>}

      <hr className="my-4" />

      <ImageGallery imageUrls={imageData} />
    </div>
  );
};

export default AdminImageManager;