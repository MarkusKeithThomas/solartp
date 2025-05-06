import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { VoucherForm } from "../../../components/admin/VoucherForm";
import { Voucher } from "../../../type/admin/voucher";
import { voucherApi } from "../../../api/voucherApi";

export default function VoucherCreatePage() {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  const handleCreateVoucher = async (data: Voucher) => {
    setCreating(true);
    try {
      await voucherApi.createVoucher(data);
      navigate("/admin/vouchers");
    } catch (err) {
      alert("Tạo voucher thất bại!");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">➕ Tạo mới Mã Giảm Giá</h3>
      <VoucherForm
  initialValues={{
    code: "",
    discountType: "FIXED", // 👈 THÊM DÒNG NÀY
    discount: 0,
    minOrderValue: 0,
    maxOrderValue: 0,
    quantity: 0,
    startAt: "",
    endAt: "",
    active: true,
  }}        onSubmit={handleCreateVoucher}
        isSubmitting={creating}
      />
    </Container>
  );
}