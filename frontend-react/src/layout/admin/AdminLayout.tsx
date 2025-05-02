import SidebarAdmin from "./SidebarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import '../../styles/admin-layout.css'
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-dashboard">
  <aside className="admin-sidebar">
    <SidebarAdmin />
  </aside>
  <div className="admin-main d-flex flex-column" style={{ height: '100vh' }}>
  <HeaderAdmin />
    <main className="admin-content">
      <Outlet />
    </main>
  </div>
</div>
  );
};

export default AdminLayout;
