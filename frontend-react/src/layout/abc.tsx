import {
    Nav,
    Navbar as NavbarBs,
    Button,
    Offcanvas,
    Container,
  } from "react-bootstrap";
  import "bootstrap-icons/font/bootstrap-icons.css";
  import "../styles/custom.css";
  import { LoginDropDown } from "../components/LoginDropDown.tsx";
  import { useState, useEffect } from "react";
  import { useShoppingCart } from "../context/ProductContext.tsx";
  
  export function Navbar() {
    const { openCart, cartQuantity } = useShoppingCart();
    const [scrolled, setScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const handleShow = () => setShowMenu(true);
    const handleClose = () => setShowMenu(false);
  
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
          className={`justify-content-between align-items-center shadow-sm mb-2 navbar-custom ${scrolled ? "scrolled" : ""}`}
        >
          <Container fluid className="d-flex justify-content-between align-items-center">
            {/* Logo */}
            <NavbarBs.Brand href="/" className="ms-2">
              <img src="/imgs/logo_tpsolar.webp" alt="Logo" height="60" width="60" />
            </NavbarBs.Brand>
  
            {/* Nút hamburger cho mobile */}
            <Button
              variant="outline-primary"
              className="d-lg-none ms-auto me-2"
              onClick={handleShow}
            >
              <i className="bi bi-list fs-2"></i>
            </Button>
  
            {/* Navigation desktop */}
            <Nav className="d-none d-lg-flex flex-row justify-content-center align-items-center">
              {/* === Đèn năng lượng === */}
              <Nav.Link
                href="/den-nang-luong-mat-troi"
                className="text-dark nav-text-hover"
              >
                <div
                  className="d-flex flex-column align-items-center"
                  style={{ width: "120px" }}
                >
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

                  <p style={{ fontSize: "0.9rem" }}>Đèn Năng Lượng</p>
                </div>
              </Nav.Link>
  
              {/* === Điện mái nhà === */}
              <Nav.Link
                href="/he-thong-dien-mat-troi"
                className="text-dark nav-text-hover"
              >
                <div
                  className="d-flex flex-column align-items-center"
                  style={{ width: "110px" }}
                >
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

                  <p style={{ fontSize: "0.9rem" }}>Điện Mái Nhà</p>
                </div>
              </Nav.Link>
  
              {/* === Bài viết === */}
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

                  <p style={{ fontSize: "0.9rem" }}>Bài Viết</p>
                </div>
              </Nav.Link>
  
              {/* === Liên hệ === */}
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

                  <p style={{ fontSize: "0.9rem" }}>Liên Hệ</p>
                </div>
              </Nav.Link>
            </Nav>
  
            {/* Icons bên phải */}
            <Nav className="d-none d-lg-flex flex-row">
              <Nav.Link href="/tim-kiem" className="text-dark ms-5">
                <i className="bi bi-search fs-4" style={{ color: "#007BFF" }}></i>
              </Nav.Link>
              <LoginDropDown className="text-dark ms-5 me-5" />
              <Button
                onClick={openCart}
                style={{ width: "3rem", height: "3rem", position: "relative" }}
                variant="outline-yellow"
                className="rounded-circle me-4"
              >
                <i className="bi bi-cart fs-4" />
                {cartQuantity > 0 && (
                  <div
                    className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
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
                )}
              </Button>
            </Nav>
          </Container>
        </NavbarBs>
  
        {/* Offcanvas menu cho mobile */}
        <Offcanvas show={showMenu} onHide={handleClose} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link href="/den-nang-luong-mat-troi" onClick={handleClose}>Đèn Năng Lượng</Nav.Link>
              <Nav.Link href="/he-thong-dien-mat-troi" onClick={handleClose}>Điện Mái Nhà</Nav.Link>
              <Nav.Link href="/bai-viet" onClick={handleClose}>Bài Viết</Nav.Link>
              <Nav.Link href="/lien-he" onClick={handleClose}>Liên Hệ</Nav.Link>
              <Nav.Link href="/tim-kiem" onClick={handleClose}>Tìm Kiếm</Nav.Link>
              <div className="mt-3">
                <LoginDropDown />
              </div>
              <div className="mt-3">
                <Button
                  onClick={() => {
                    openCart();
                    handleClose();
                  }}
                  variant="outline-dark"
                >
                  Giỏ Hàng ({cartQuantity})
                </Button>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }