import { useEffect, useState } from "react";
import { Button, Table, Spinner, Alert, Form } from "react-bootstrap";
import { Voucher } from "../../../type/admin/voucher";
import { voucherApi } from "../../../api/voucherApi";
import { FaAddressCard } from "react-icons/fa";

export default function VoucherPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const data = await voucherApi.getListVouchers();
      setVouchers(data);
    } catch (err) {
      setError("Không thể tải danh sách voucher.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xoá mã giảm giá này?")) return;
    setDeletingId(id);
    try {
    //   await deleteVoucher(id);
      setVouchers((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      alert("Lỗi khi xoá voucher");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (voucher: Voucher) => {
    // Redirect hoặc mở modal
    window.location.href = `/admin/vouchers/get-voucher-id/${voucher.id}`;
  };
  const handleCreate = () => {
    // Redirect hoặc mở modal
    window.location.href = `/admin/vouchers/create-voucher`;
  };

  if (loading) return <Spinner animation="border" className="mt-5" />;

  return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-4">🎟️ Danh sách mã giảm giá</h2>
      <Button
                  variant="warning"
                  size="sm"
                  className="me-2 mb-4 align-items-center justify-content-center"
                  onClick={()=> handleCreate()}
                >
                <FaAddressCard/>Thêm Voucher
                </Button>

        </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>STT</th>
            <th>Mã</th>
            <th>Loại</th>
            <th>Giảm</th>
            <th>Tối thiểu</th>
            <th>SL</th>
            <th>Đã dùng</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher, index) => (
            <tr key={voucher.id}>
              <td>{index + 1}</td>
              <td>{voucher.code}</td>
              <td>{voucher.discountType === "PERCENT" ? "Phần trăm" : "Cố định"}</td>
              <td>
                {voucher.discountType === "PERCENT"
                  ? `${voucher.discount}%`
                  : `${voucher.discount}đ`}
              </td>
              <td>{voucher.minOrderValue}đ</td>
              <td>{voucher.quantity}</td>
              <td>{voucher.used}</td>
              <td>{voucher.startAt}</td>
              <td>{voucher.endAt}</td>
              <td>
                {voucher.active ? (
                  <span className="badge bg-success">Hoạt động</span>
                ) : (
                  <span className="badge bg-secondary">Ngưng</span>
                )}
              </td>
              <td style={{minWidth: "150px"}}>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(voucher)}
                >
                  Cập nhật
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  disabled={deletingId === voucher.id}
                  onClick={() => handleDelete(voucher.id)}
                >
                  {deletingId === voucher.id ? "Đang xoá..." : "Xoá"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}