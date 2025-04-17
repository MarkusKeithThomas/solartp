import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaUsers, FaChartPie, FaTags, FaCreativeCommonsSampling } from "react-icons/fa";
import "./adminLayout.css";

const SidebarAdmin = () => {
  return (
    <div className="sidebar-admin bg-dark text-white p-3">
      <h5 className="text-white text-center mb-4">🌞 SolarTP</h5>
      <nav className="d-flex flex-column gap-2">
        <NavLink to="/admin" className="nav-link text-white">
          <FaTachometerAlt className="me-2" /> Dashboard
        </NavLink>
        <NavLink to="/admin/category" className="nav-link text-white">
          <FaCreativeCommonsSampling className="me-2" /> Category
        </NavLink>
        <NavLink to="/admin/products" className="nav-link text-white">
          <FaBox className="me-2" /> Sản phẩm
        </NavLink>
        <NavLink to="/admin/orders" className="nav-link text-white">
          <FaTags className="me-2" /> Đơn hàng
        </NavLink>
        <NavLink to="/admin/users" className="nav-link text-white">
          <FaUsers className="me-2" /> Người dùng
        </NavLink>
        <NavLink to="/admin/report" className="nav-link text-white">
          <FaChartPie className="me-2" /> Báo cáo
        </NavLink>

      </nav>
      <div className="mt-auto text-center small text-secondary mt-4">© 2025 SolarTP</div>
    </div>
  );
};

export default SidebarAdmin;
