import { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Voucher } from "../../../type/admin/voucher";
import { voucherApi } from "../../../api/voucherApi";
import { VoucherForm } from "../../../components/admin/VoucherForm";

export default function VoucherEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchVoucher();
  }, []);

  const fetchVoucher = async () => {
    try {
      const data = await voucherApi.getVoucherById(Number(id));
      setVoucher(data);
    } catch (err) {
      setError("Không thể tải dữ liệu voucher.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateVoucher = async (updatedVoucher: Voucher) => {
    setUpdating(true);
    try {
      await voucherApi.updateVoucher(updatedVoucher);
      alert("Cập nhật voucher thành công!");
      navigate("/admin/vouchers");
    } catch (err) {
      alert("Cập nhật voucher thất bại!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Spinner animation="border" className="mt-5" />;
  if (error) return <Alert variant="danger" className="mt-5">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h3 className="mb-4">📝 Chỉnh sửa Mã Giảm Giá</h3>
      <VoucherForm
        initialValues={voucher!}
        onSubmit={handleUpdateVoucher}
        isSubmitting={updating}
        isEdit
      />
    </Container>
  );
}