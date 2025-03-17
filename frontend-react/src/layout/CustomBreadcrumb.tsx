import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/custom.css"; // Import CSS
import { formatStringViewLink } from '../ultities/formatStringViewLink';
import { formatTitle } from "../ultities/formatTitle";

export function CustomBreadcrumb({ hideOnNavbar }: { hideOnNavbar?: boolean }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  if (hideOnNavbar) return null; // ✅ Nếu Breadcrumb đã có trên navbar, ẩn nó


  return (
    <div className="breadcrumb-container mb-3">
      <Breadcrumb>
        {/* Home Icon + Trang chủ */}
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }} className="breadcrumb-home">
          <i className="bi bi-house-door-fill"></i> Trang chủ
        </Breadcrumb.Item>

        {/* Tạo đường dẫn động từ URL */}
        {pathnames.map((value, index) => {
          const fullPath = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Breadcrumb.Item active key={fullPath} className="fw-bold">
              {decodeURIComponent(formatStringViewLink(value))}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={fullPath} linkAs={Link} linkProps={{ to: fullPath }} className="breadcrumb-link">
              {decodeURIComponent(formatStringViewLink(value))}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
}