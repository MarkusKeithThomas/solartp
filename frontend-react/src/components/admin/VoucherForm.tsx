import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { discountType, Voucher } from "../../type/admin/voucher";

type Props = {
  initialValues: Partial<Voucher>;
  onSubmit: (values: Voucher) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
};

export const VoucherForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  isSubmitting = false,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<Partial<Voucher>>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    let newValue: any;
  
    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      const value = (e.target as HTMLInputElement).value;
      newValue = value === "" ? undefined : parseFloat(value);
    } else {
      newValue = e.target.value;
    }
  
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { code, discountType, discount } = formData;
    console.log("DEBUG FORM:", formData.discountType);  
    const isValid =
      typeof code === "string" &&
      code.trim().length > 0 &&
      (discountType === "FIXED" || discountType === "PERCENT") &&
      typeof discount === "number" &&
      !isNaN(discount);
  
    if (isValid) {
      await onSubmit(formData as Voucher);
    } else {
      alert("Vui lòng điền đủ thông tin cơ bản.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Mã giảm giá</Form.Label>
            <Form.Control
              name="code"
              value={formData.code || ""}
              onChange={handleChange}
              disabled={isEdit}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Loại giảm giá</Form.Label>
            <Form.Select
  name="discountType"
  value={formData.discountType || "FIXED"} // fallback nếu chưa có
  onChange={handleChange}
>
  <option value="FIXED">Cố định</option>
  <option value="PERCENT">Phần trăm</option>
</Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Giá trị giảm</Form.Label>
            <Form.Control
              type="number"
              name="discount"
              value={formData.discount ?? ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số lượng</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity ?? ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Giá trị đơn tối thiểu</Form.Label>
            <Form.Control
              type="number"
              name="minOrderValue"
              value={formData.minOrderValue ?? ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Giảm tối đa</Form.Label>
            <Form.Control
              type="number"
              name="maxOrderValue"
              value={formData.maxOrderValue ?? ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ngày bắt đầu</Form.Label>
            <Form.Control
              type="datetime-local"
              name="startAt"
              value={formData.startAt || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ngày kết thúc</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endAt"
              value={formData.endAt || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Đang hoạt động"
              name="active"
              checked={formData.active}
                onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? "Đang xử lý..." : isEdit ? "Cập nhật" : "Tạo mới"}
      </Button>
    </Form>
  );
};