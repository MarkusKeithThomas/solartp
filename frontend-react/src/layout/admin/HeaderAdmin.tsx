import { Dropdown } from "react-bootstrap";
import { useAuthContext } from "../../context/AuthProvider";

const HeaderAdmin = () => {
  const userInfo = localStorage.getItem("user-info-admin");
  const user = userInfo ? JSON.parse(userInfo) : null;
  const { logoutAdmin } = useAuthContext();

  const admin = {
    name: user?.email || "admin@example.com",
    role: "Quản trị viên",
    avatar: "https://i.pravatar.cc/36?img=8",
  };

  return (
    <header className="header-admin d-flex justify-content-between align-items-center px-4 py-2 border-bottom bg-white">
      {/* Logo / tên hệ thống */}
      <h5 className="m-0 text-primary fw-semibold" style={{ fontSize: "1.1rem" }}>
        📊 Admin Dashboard
      </h5>

      {/* Profile section */}
      <div className="d-flex align-items-center gap-3">
        <span className="text-muted small">{admin.role}</span>

        <Dropdown align="end">
          <Dropdown.Toggle variant="light" id="admin-profile-dropdown" className="d-flex align-items-center border-0 bg-transparent shadow-none">
            <img
              src={admin.avatar}
              alt="avatar"
              className="rounded-circle me-2"
              width={36}
              height={36}
              style={{ objectFit: "cover" }}
            />
            <span className="fw-medium text-dark">{admin.name}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>👤 Hồ sơ cá nhân</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logoutAdmin}>🚪 Đăng xuất</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default HeaderAdmin;