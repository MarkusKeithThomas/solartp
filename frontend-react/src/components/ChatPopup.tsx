import React, { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; phone: string; gender: "Nam" | "Nữ" }) => void;
}

export const ChatPopup: React.FC<Props> = ({ show, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<"Nam" | "Nữ">();
  const [errors, setErrors] = useState<{ name?: string; phone?: string; gender?: string }>({});

  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show && nameRef.current) nameRef.current.focus();
  }, [show]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Vui lòng nhập tên";
    if (!phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^\d{9,12}$/.test(phone)) newErrors.phone = "Số điện thoại không hợp lệ";
    if (!gender) newErrors.gender = "Vui lòng chọn giới tính";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
        onSubmit({ name: name.trim(), phone: phone.trim(), gender: gender as "Nam" | "Nữ" });
    }
  };

  if (!show) return null;

  return (
    <div
      className="shadow-lg rounded-top border border-danger"
      style={{
        position: "fixed",
        bottom: "80px",
        right: "16px",
        width: "300px",
        backgroundColor: "#fff",
        zIndex: 1050,
      }}
    >
      {/* Header */}
      <div className="bg-danger text-white p-2 d-flex justify-content-between align-items-center rounded-top">
        <strong>💬 Chat với nhân viên tư vấn</strong>
        <button onClick={onClose} className="btn btn-sm btn-light text-danger fw-bold">×</button>
      </div>

      <div className="p-3">
        <p className="text-muted mb-2" style={{ fontSize: "14px" }}>Liên hệ SolarTP nhận ngay voucher</p>

        {/* Tên */}
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Nhập tên của bạn *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={nameRef}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        {/* SĐT */}
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Nhập số điện thoại *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
        </Form.Group>

        {/* Giới tính */}
        <Form.Group className="mb-3">
          <Form.Select
            value={gender}
            onChange={(e) => setGender(e.target.value as "Nam" | "Nữ")}
            isInvalid={!!errors.gender}
          >
            <option value={undefined}>Giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
        </Form.Group>

        <button className="btn btn-danger w-100 fw-bold" onClick={handleSubmit}>
          🚀 BẮT ĐẦU TRÒ CHUYỆN
        </button>
      </div>
    </div>
  );
};