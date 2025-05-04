import { useEffect, useState } from "react";
import { Table, Card, Button, Spinner, Form, Modal } from "react-bootstrap";
import { userApi } from "../../api/admin/userApi";
import { User } from "../../type/admin/user";
import { toast } from "react-toastify";

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User>();
  const [updateRole, setUpdateRole] = useState<string>("");
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const listUsers = await userApi.getListUserAdminStaff();
        setUsers(listUsers); // ✅ listUsers là User[]
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleUpdateUser = async (userId: number, newRole: string) => {
    setUpdatingUserId(userId);
    try {
      const  res = await userApi.updatedUserRole(userId, newRole);
      window.alert("✅ Đã cập nhật "+newRole);
    } catch (error) {
      toast.error("Lỗi cập nhật vai trò");
      console.error(error);
    } finally {
      setUpdatingUserId(null);
    }
  };
  const handleCreateNewUserAdmin = async (user:User) => {

    try {
      const res = await userApi.createNewUserAdmin(user);
      console.log("createNewUserAdmin "+res);
      if(res === null){
        setUsers((prev) => 
        [...prev,user]
        )
        setShowModal(false);
        setNewUser(undefined);}
        window.alert("Bạn đã tạo tài khoản với email thành công "+user.email);


    } catch (error) {
      window.alert("Kiểm tra lại trường thông tin đã điền mail");

    }

  }
  const handleNewList = (userId: number, newRole: string) => {
    setUpdateRole(newRole);
    setUsers((prev) =>
      prev?.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
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
                      value={user.role}
                      onChange={(e) => handleNewList(user.id, e.target.value)}
                    >
                      <option value="ROLE_ADMIN">ADMIN</option>
                      <option value="ROLE_STAFF">STAFF</option>
                      <option value="ROLE_USER">USER</option>
                    </Form.Select>
                  </td>
                  <td className="d-flex gap-2">
                    <Button variant="outline-danger" size="sm" className="me-2">
                      Xoá
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleUpdateUser(user.id, updateRole)}
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
            <Form.Control name="email" 
                          value={formData.email || ""} 
                          onChange={handleChange}
                          />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control name="name" 
                          value={formData.name} 
                          onChange={handleChange}
                          />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" 
                          value={formData.password}
                          onChange={handleChange}
                          />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quyền</Form.Label>
            <Form.Select name="role" 
                        value={formData.role}
                        onChange={handleChange}
                        >
              <option value="ROLE_ADMIN">ADMIN</option>
              <option value="ROLE_STAFF">STAFF</option>
              <option value="ROLE_USER">USER</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Huỷ
          </Button>
          <Button
            variant="primary"
            onClick={() => handleCreateNewUserAdmin(formData as User)}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default UserManagementPage;
