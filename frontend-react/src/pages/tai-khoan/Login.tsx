import React, { useState } from "react";
import { Dropdown, Image, Form } from "react-bootstrap";
import { BsPerson, BsBox, BsHeart, BsQuestionCircle, BsArrowRight, BsLightbulb } from "react-icons/bs";
interface LoginProps {
    className?: string; // Cho phép nhận className từ ngoài
  }

export function Login({ className }: LoginProps) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Dropdown align="end" className={className}>
      {/* Nút mở Dropdown */}
      <Dropdown.Toggle variant="light" id="dropdown-user">
        <BsPerson size={24} />
      </Dropdown.Toggle>

      {/* Nội dung Dropdown */}
      <Dropdown.Menu className="shadow rounded-4 p-3 user-dropdown" style={{ minWidth: "14rem" }}>
        {/* Hồ sơ người dùng */}
        <div className="d-flex align-items-center">
          <Image src="https://randomuser.me/api/portraits/women/44.jpg" roundedCircle width={50} height={50} />
          <div className="ms-3">
            <strong className="d-block text-justify">Chau Tran Chau Nguyen Chau</strong>
            <small className="text-muted">Los Angeles, CA</small>
          </div>
        </div>

        <hr />

        {/* Danh sách menu */}
        <Dropdown.Item className="d-flex align-items-center">
          <BsPerson className="me-2" /> My Account
        </Dropdown.Item>
        <hr />

        {/* Chế độ Dark Mode */}
        <div className="d-flex align-items-center px-3">
          <div className="d-flex align-items-center">
            <BsLightbulb className="me-2" />
            <span>Dark theme</span>
          </div>
          <Form.Check 
            type="switch" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        <hr />

        {/* Hỗ trợ & Đăng xuất */}
        <Dropdown.Item className="d-flex align-items-center">
          <BsQuestionCircle className="me-2" /> Help
        </Dropdown.Item>
        <Dropdown.Item className="d-flex align-items-center text-danger">
          <BsArrowRight className="me-2" /> Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}