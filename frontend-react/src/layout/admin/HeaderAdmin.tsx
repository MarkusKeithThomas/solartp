import { Dropdown } from "react-bootstrap";
import { useAuthContext } from "../../context/AuthProvider";

const HeaderAdmin = () => {
  const userInfo = localStorage.getItem("user-info");
  const user = userInfo ? JSON.parse(userInfo) : null;
  const {logoutAdmin} = useAuthContext();
  const admin = {
    name: user?.email || "ADMIN",
    role: "Quản trị viên",
    avatar: "https://i.pravatar.cc/36?img=8"
  };

  return (
    <div className="header-admin d-flex justify-content-between align-items-center p-3 border-bottom bg-white shadow-sm">
      <h5 className="m-0">📊 Bảng điều khiển quản trị</h5>
      <div className="d-flex align-items-center gap-3">
        <span className="text-muted">{admin.role}</span>

        <Dropdown align="end">
          <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center">
            <img
              src={admin.avatar}
              alt="avatar"
              className="rounded-circle me-2"
              width={36}
              height={36}
            />
            {admin.name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item

            >👤 Hồ sơ cá nhân</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logoutAdmin}>🚪 Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderAdmin;
