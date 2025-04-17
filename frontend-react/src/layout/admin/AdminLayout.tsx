import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import "./adminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-dashboard d-flex">
      <aside className="admin-sidebar">
        <SidebarAdmin />
      </aside>
      <div className="admin-main flex-grow-1 d-flex flex-column">
        <HeaderAdmin />
        <main className="admin-content flex-grow-1 p-4 bg-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
