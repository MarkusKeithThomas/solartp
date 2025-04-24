import { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert, Badge } from "react-bootstrap";
import { registerSolarPanelListApi } from "../../api/solarpanelApi";

interface RegisterInfo {
  id: number;
  fullName: string;
  phone: string;
  address: string;
  financialRange: string;
  customAmount: string;
  createdAt: string;
}

export default function RegisterSolarPanel() {
  const [data, setData] = useState<RegisterInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    registerSolarPanelListApi()
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Có lỗi xảy ra, vui lòng thử lại sau.");
        setLoading(false);
      });
  }, []);

  return (
    <Container style={{ maxWidth: 960 }} className="py-5">
      <h2 className="fw-bold text-center mb-4 text-primary border-bottom pb-2">
        🌞 Danh Sách Đăng Ký Tư Vấn Điện Mặt Trời
      </h2>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table bordered responsive hover className="shadow-sm align-middle text-nowrap">
          <thead className="table-primary text-center">
            <tr>
              <th style={{ width: "40px" }}>#</th>
              <th style={{ width: "160px" }}>👤 Họ tên</th>
              <th style={{ width: "120px" }}>📞 Số điện thoại</th>
              <th className="text-wrap" style={{ width: "1000px", whiteSpace: "normal" }}>📍 Địa chỉ</th>
              <th style={{ width: "140px" }}>💰 Gói tài chính</th>
              <th style={{ width: "160px" }}>💵 Số tiền cụ thể</th>
              <th style={{ width: "160px" }}>⏰ Thời gian gửi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center">{index + 1}</td>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td style={{ whiteSpace: "normal" }}>{item.address}</td>
                <td>
                  <Badge bg="info" className="text-dark">{item.financialRange}</Badge>
                </td>
                <td>
                  {item.customAmount ? (
                    <span className="text-success fw-semibold">{item.customAmount} VNĐ</span>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}