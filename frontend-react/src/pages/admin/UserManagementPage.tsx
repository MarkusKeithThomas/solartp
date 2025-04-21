import { useEffect, useState } from "react";
import {
  Table,
  Card,
  Button,
  Spinner,
  Form,
  Modal,
} from "react-bootstrap";
import { Users} from '../../type/admin/user';
import usersData from "../../assets/fakedata/users.json";

const UserManagementPage = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<Users>({
    id: 0,
    email: "",
    name: "",
    role: {
      id: 0,
      name: "ROLE_USER",
      role: "USER",
    },
    userInfo: {
      address: "",
      birthday: "",
      description: "",
      fullName: "",
      gender: "",
      phone: "",
    },
  });

  useEffect(() => {
    setUsers(
      usersData.map((user) => ({
        ...user,
        role: {
          id: 0,
          name: `ROLE_${user.role}`,
          role: user.role,
        },
        userInfo: {
          address: "",
          birthday: "",
          description: "",
          fullName: "",
          gender: "",
          phone: "",
        },
      })) as Users[]
    );
    setLoading(false);
  }, []);

  const handleAddUser = () => {
    const updatedUsers = [...users];
    const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    updatedUsers.push({ ...newUser, id: nextId });
    setUsers(updatedUsers);
    setShowModal(false);
    setNewUser({
      id: 0,
      email: "",
      name: "",
      role: { id: 0, name: "ROLE_USER", role: "USER" },
      userInfo: {
        address: "",
        birthday: "",
        description: "",
        fullName: "",
        gender: "",
        phone: "",
      },
    });
  };

  const handleChangeRole = (userId: number, newRole: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: { ...user.role, role: newRole } } : user
      )
    );
  };
  
  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Bạn chắc chắn muốn xoá người dùng này?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  const handleUpdateUser = async (userId: number) => {
    const userToUpdate = users.find((u) => u.id === userId);
    if (!userToUpdate) return;
  
    try {
      // Gọi API để cập nhật role
    //   await updateUserRoleApi(userId, userToUpdate.role.role); // 👈 API này bạn sẽ khai báo riêng
      alert("✅ Cập nhật quyền người dùng thành công");
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật quyền:", err);
      alert("❌ Cập nhật thất bại. Vui lòng thử lại");
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    if (name === "role") {
      setNewUser((prev) => ({
        ...prev,
        role: {
          id: 0,
          name: `ROLE_${value}`,
          role: value,
        },
      }));
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>👤 Danh sách người dùng</span>
        <Button onClick={() => setShowModal(true)}>+ Thêm người dùng</Button>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Tên</th>
                <th>Quyền</th>
              </tr>
            </thead>
            <tbody>
  {users.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.name}</td>
      <td>
        <Form.Select
          size="sm"
          value={user.role.role}
          onChange={(e) => handleChangeRole(user.id, e.target.value)}
        >
          <option value="ADMIN">ADMIN</option>
          <option value="STAFF">STAFF</option>
          <option value="USER">USER</option>
        </Form.Select>
      </td>
      <td>
  <Button
    size="sm"
    variant="outline-danger"
    onClick={() => handleDeleteUser(user.id)}
  >
    Xoá
  </Button>{" "}
  <Button
    size="sm"
    variant="outline-success"
    onClick={() => handleUpdateUser(user.id)}
  >
    Cập nhật
  </Button>
</td>
    </tr>
  ))}
</tbody>
          </Table>
        )}
      </Card.Body>

      {/* Modal thêm người dùng */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>➕ Thêm người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" value={newUser.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control name="name" value={newUser.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" value="" onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quyền</Form.Label>
            <Form.Select name="role" value={newUser.role.role} onChange={handleChange}>
              <option value="ADMIN">ADMIN</option>
              <option value="STAFF">STAFF</option>
              <option value="USER">USER</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default UserManagementPage;