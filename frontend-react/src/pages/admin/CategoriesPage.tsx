import { Card, Table, Button, Form } from "react-bootstrap";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Category } from "../../type/admin/category";
import { getAllCategories } from "../../api/admin/categoryApi";

const initialFormState: Category = {
  name: "",
  description: "",
};

// const mockCategories: Category[] = [
//   { id: 1, name: "Đèn năng lượng", slug: "den-nang-luong", description: "Các loại đèn sử dụng NLMT" },
//   { id: 2, name: "Tấm pin mặt trời", slug: "tam-pin", description: "Tấm pin Mono, Poly" },
//   { id: 3, name: "Bộ lưu điện", slug: "bo-luu-dien", description: "Lưu trữ điện NLMT cho ban đêm" },
// ];

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<Category>(initialFormState);
  const [editingId, setEditingId] = useState<number | null>(null);

const loadCategories = async () => {
  try {
    const data = await getAllCategories();
    setCategories(data);
  } catch (err) {
    console.error("❌ Không lấy được danh mục:", err);
  }
};
useEffect(() =>{
    loadCategories();
},[]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = ({ id, name, description }: Category) => {
    setForm({ name, description });
    setEditingId(id || null);
  };

  const handleCancelEdit = () => {
    setForm(initialFormState);
    setEditingId(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingId) {
      setCategories(prev =>
        prev.map(cat =>
          cat.id === editingId ? { ...cat, ...form } : cat
        )
      );
    } else {
      const newCategory: Category = { ...form};
      setCategories(prev => [...prev, newCategory]);
    }

    handleCancelEdit();
  };

  return (
    <Card>
      <Card.Header>📂 Quản lý danh mục sản phẩm</Card.Header>
      <Card.Body>
        <Form className="mb-4" onSubmit={handleSubmit}>
          <h6 className="mb-3">{editingId ? "Cập nhật danh mục" : "Thêm danh mục mới"}</h6>
          {['name', 'description'].map((field, idx) => (
            <Form.Group key={field} className={idx < 2 ? "mb-2" : "mb-3"}>
              <Form.Control
                name={field}
                as={field === "description" ? "textarea" : "input"}
                placeholder={
                  field === "name"
                    ? "Tên danh mục"
                    : "Mô tả ngắn"
                }
                {...(field === "description" && { rows: 2 })}
                value={(form as any)[field]}
                onChange={handleChange}
              />
            </Form.Group>
          ))}

          <div className="d-flex gap-2">
            <Button variant={editingId ? "primary" : "success"} type="submit">
              {editingId ? "Cập nhật" : "Thêm danh mục"}
            </Button>
            {editingId && (
              <Button variant="secondary" type="button" onClick={handleCancelEdit}>
                Hủy
              </Button>
            )}
          </div>
        </Form>

        <Table responsive hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên danh mục</th>
              <th>Slug</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(({ id, name, slug, description }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{slug}</td>
                <td>{description}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit({ id, name, slug, description })}
                  >
                    Sửa
                  </Button>
                  <Button variant="outline-danger" size="sm">Xoá</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default CategoriesPage;