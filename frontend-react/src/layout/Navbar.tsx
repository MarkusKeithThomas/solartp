import {
  Nav,
  Navbar as NavbarBs,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "../styles/custom.css"; // Import CSS tùy chỉnh
import { LoginDropDown } from "../components/LoginDropDown.tsx";
import { useState, useEffect } from "react";
import { useShoppingCart } from "../context/ProductContext.tsx";
export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <NavbarBs
        sticky="top"
        className={`justify-content-center align-items-center shadow-sm mb-2 navbar-custom ${scrolled ? "scrolled" : ""}`}
      >
          {/* Logo */}
          <NavbarBs.Brand href="/" className="ms-2">
            <img src="/imgs/logo_tpsolar.webp" alt="Logo" height="60" />
          </NavbarBs.Brand>

          {/* Navigation */}
          <Nav className="d-flex flex-row justify-content-center align-items-center">
            {/* Giữ nguyên Home, About, Store, Post trên mobile */}
            <Nav.Link
              href="/den-nang-luong-mat-troi"
              className="text-dark nav-text-hover"
            >
              <div
                className="d-flex flex-column align-items-center "
                style={{ width: "120px" }}
              >
                {/* SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 45 45"
                  width="45"
                  height="45"
                  fill="currentColor"
                >
                  {/* Mặt trời */}
                  <circle
                    cx="32"
                    cy="16"
                    r="6"
                    fill="#FFD700"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <line
                    x1="32"
                    y1="2"
                    x2="32"
                    y2="10"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <line
                    x1="32"
                    y1="22"
                    x2="32"
                    y2="30"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <line
                    x1="22"
                    y1="16"
                    x2="10"
                    y2="16"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <line
                    x1="54"
                    y1="16"
                    x2="42"
                    y2="16"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />

                  {/* Tấm pin mặt trời */}
                  <rect
                    x="10"
                    y="32"
                    width="44"
                    height="20"
                    fill="#1E3A8A"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />
                  <line
                    x1="10"
                    y1="40"
                    x2="54"
                    y2="40"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />
                  <line
                    x1="10"
                    y1="48"
                    x2="54"
                    y2="48"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />

                  {/* Giá đỡ */}
                  <rect
                    x="26"
                    y="52"
                    width="12"
                    height="8"
                    fill="#6B7280"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                </svg>
                <p style={{fontSize:"0.9rem"}}>Đèn Năng Lượng</p>
              </div>
            </Nav.Link>
            <Nav.Link
              href="/he-thong-dien-mat-troi"
              className="text-dark nav-text-hover"
            >
              <div
                className="d-flex flex-column align-items-center"
                style={{ width: "110px" }}
              >
                {/* SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 45 45"
                  width="45"
                  height="45"
                  fill="currentColor"
                >
                  {/* Mặt trời */}
                  <circle
                    cx="50"
                    cy="10"
                    r="6"
                    fill="#FFD700"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <line
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="6"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <line
                    x1="50"
                    y1="14"
                    x2="50"
                    y2="20"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <line
                    x1="42"
                    y1="10"
                    x2="32"
                    y2="10"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <line
                    x1="60"
                    y1="10"
                    x2="55"
                    y2="10"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />

                  {/* Mái nhà */}
                  <polygon
                    points="8,30 32,10 56,30"
                    fill="#374151"
                    stroke="#1E293B"
                    strokeWidth="2"
                  />
                  <rect
                    x="14"
                    y="30"
                    width="36"
                    height="18"
                    fill="#1E3A8A"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />

                  {/* Dây điện */}
                  <line
                    x1="32"
                    y1="48"
                    x2="32"
                    y2="54"
                    stroke="#FACC15"
                    strokeWidth="2"
                  />
                  <polygon
                    points="28,54 36,54 32,60"
                    fill="#FACC15"
                    stroke="#D97706"
                    strokeWidth="2"
                  />
                </svg>
                <p style={{fontSize:"0.9rem"}}>Điện Mái Nhà</p>
              </div>
            </Nav.Link>

            <Nav.Link
              href="/bai-viet"
              className="text-dark text-center d-none d-lg-flex nav-text-hover"
            >
              <div
                className="d-flex flex-column align-items-center"
                style={{ width: "110px" }}
              >
                {/* SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 45 45"
                  width="45"
                  height="45"
                  fill="currentColor"
                >
                  {/* Hình tờ báo/bài viết */}
                  <rect
                    x="12"
                    y="10"
                    width="40"
                    height="44"
                    fill="#E5E7EB"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    rx="3"
                  />
                  <line
                    x1="16"
                    y1="16"
                    x2="40"
                    y2="16"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <line
                    x1="16"
                    y1="22"
                    x2="40"
                    y2="22"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <line
                    x1="16"
                    y1="28"
                    x2="36"
                    y2="28"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <line
                    x1="16"
                    y1="34"
                    x2="36"
                    y2="34"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <line
                    x1="16"
                    y1="40"
                    x2="30"
                    y2="40"
                    stroke="#374151"
                    strokeWidth="2"
                  />

                  {/* Mặt trời nhỏ góc phải */}
                  <circle
                    cx="50"
                    cy="14"
                    r="5"
                    fill="#FFD700"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <line
                    x1="50"
                    y1="8"
                    x2="50"
                    y2="5"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <line
                    x1="50"
                    y1="19"
                    x2="50"
                    y2="23"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <line
                    x1="44"
                    y1="14"
                    x2="41"
                    y2="14"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <line
                    x1="56"
                    y1="14"
                    x2="53"
                    y2="14"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                </svg>
                <p style={{fontSize:"0.9rem"}}>Bài Viết</p>
              </div>
            </Nav.Link>

            {/* Ẩn các mục này trên màn hình nhỏ (smartphone) */}
            <Nav.Link
              href="/lien-he"
              className="text-dark text-center d-none d-lg-flex nav-text-hover"
            >
              <div
                className="d-flex flex-column align-items-center"
                style={{ width: "120px" }}
              >
                {/* SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width="42"
                  height="42"
                  style={{ color: "#007BFF" }}
                >
                  {/* Icon Tờ Giấy */}
                  <path d="M4 2a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7l-5-5H4zm1 2h7v4h4v12H5V4zm2 5v2h8V9H7zm0 4v2h8v-2H7zm0 4v2h5v-2H7z" />

                  {/* Icon Điện Thoại */}
                  <path d="M20 6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3a1 1 0 0 1-.707-.293l-3.707-3.707a1 1 0 0 1 0-1.414l.707-.707a1 1 0 0 1 1.414 0L15 17h3V9h-2a3 3 0 0 1-2.121-.879l-.707-.707A3 3 0 0 1 12.5 6l.707-.707A3 3 0 0 1 15 4h3a2 2 0 0 1 2 2z" />
                </svg>
                <p style={{fontSize:"0.9rem"}}>Liên Hệ</p>
              </div>
            </Nav.Link>
          </Nav>

          {/* Icons bên phải */}
          <Nav className="d-flex flex-row">
            <Nav.Link href="/tim-kiem" className="text-dark d-none d-lg-flex ms-5">
              <i className="bi bi-search fs-4" style={{ color: "#007BFF" }}></i>{" "}
            </Nav.Link>
            <LoginDropDown className="text-dark d-none d-lg-flex custom-dropdown ms-5 me-5"></LoginDropDown>
            <Button
            onClick={openCart}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-yellow"
            className="rounded-circle me-4 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>

            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center me-1"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
          </Nav>

      </NavbarBs>
    </>
  );
}
