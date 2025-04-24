import { useState } from "react";
import { Form, Button, Container, Alert, Table } from "react-bootstrap";
import "../../styles/custom.css";
import { registerSolarPanelApi } from "../../api/solarpanelApi";

export function SolarPanel() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    financialRange: "",
    customAmount: ""
  });

  const [status, setStatus] = useState("");
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const dataToSend = {
      ...formData,
      financialValue:
        formData.financialRange === "Khác"
          ? formData.customAmount
          : formData.financialRange
    };

    try {
      const res = await registerSolarPanelApi(dataToSend);
      setSubmittedData(res.data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container style={{ maxWidth: "720px", paddingTop: "2rem" }}>
      {/* Giới thiệu */}
      <div className="bg-light p-4 rounded shadow-sm solar-intro font-poppins">
        <h1 className="text-primary text-center fw-bold mb-4">
          Điện Mặt Trời Mái Nhà Gia Đình và Hộ Kinh Doanh
        </h1>
        <p>
          Điện mặt trời mái nhà không chỉ giúp tiết kiệm hóa đơn điện mỗi tháng
          mà còn là bước đi thông minh trong thời đại năng lượng xanh. <strong>Solar TP</strong> với
          kinh nghiệm hơn 5 năm trong lắp đặt hệ thống điện áp mái cho hộ gia đình.
        </p>
        <p><strong>Chúng tôi cam kết:</strong></p>
        <ul className="mb-3">
          <li>🔋 Giải pháp năng lượng hiệu quả và bền vững nhất</li>
          <li>⚡ Hệ thống được thiết kế tối ưu hiệu suất và tiết kiệm chi phí</li>
          <li>🛡️ Bảo hành lên đến <strong>25 năm</strong></li>
        </ul>
        <h3>Đến với Solar TP bạn luôn nhận giá trị hơn bạn mong muốn.</h3>
      </div>

      {/* Ưu đãi đặc biệt */}
      <div className="solar-highlight-offer p-3 rounded text-center mb-4">
        <h5 className="fw-bold mb-2 text-uppercase text-primary">
          Solar TP tư vấn miễn phí
        </h5>
        <p className="text-warning fs-5 fw-semibold animate-blink">
          🎉 Tháng 4: 10 khách hàng đầu tiên lắp đặt được giảm ngay <strong>1.000.000 VNĐ</strong> vào hóa đơn!
        </p>
      </div>

      {/* Thông báo */}
      {status === "success" && (
        <Alert variant="success">Solar TP đã nhận thông tin thành công!</Alert>
      )}
      {status === "error" && (
        <Alert variant="danger">Gửi không thành công. Vui lòng thử lại.</Alert>
      )}

      {/* Form */}
      {status !== "success" && (
        <Form
          onSubmit={handleSubmit}
          className="bg-white p-4 shadow rounded-3 border"
        >
          <Form.Group className="mb-3">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Nhập họ tên"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Nhập địa chỉ"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Khả năng tài chính dự kiến</Form.Label>
            <div className="d-flex flex-column gap-2">
              {["Trên 50 triệu", "Trên 75 triệu", "Trên 100 triệu", "Khác"].map((option) => (
                <Form.Check
                  key={option}
                  type="radio"
                  label={option}
                  name="financialRange"
                  value={option}
                  checked={formData.financialRange === option}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      financialRange: e.target.value,
                      customAmount: ""
                    })
                  }
                />
              ))}
            </div>
            {formData.financialRange === "Khác" && (
              <Form.Control
                type="number"
                name="customAmount"
                className="mt-2"
                placeholder="Nhập số tiền cụ thể (VNĐ)"
                value={formData.customAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customAmount: e.target.value
                  })
                }
              />
            )}
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Đang gửi...
              </>
            ) : (
              "Gửi Thông Tin"
            )}
          </Button>
        </Form>
      )}

      {/* Hiển thị lại thông tin sau khi gửi */}
      {submittedData && (
        <div className="mt-4 p-3 bg-light border rounded shadow-sm">
          <h5 className="fw-bold text-success mb-3">🎉 Thông tin bạn vừa gửi:</h5>
          <Table bordered responsive>
            <tbody>
              <tr><td>Họ tên</td><td>{submittedData.fullName}</td></tr>
              <tr><td>Điện thoại</td><td>{submittedData.phone}</td></tr>
              <tr><td>Địa chỉ</td><td>{submittedData.address}</td></tr>
              <tr><td>Gói tài chính</td><td>{submittedData.financialRange}</td></tr>
              {submittedData.customAmount && (
                <tr><td>Số tiền cụ thể</td><td>{submittedData.customAmount} VNĐ</td></tr>
              )}
              <tr><td>Thời gian gửi</td><td>{submittedData.createdAt}</td></tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}