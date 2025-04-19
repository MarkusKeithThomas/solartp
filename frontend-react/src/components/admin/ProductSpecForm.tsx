// ProductSpecForm.tsx
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Product } from "../../context/ProductProvider";

interface Props {
  product: Product;
  setProduct: (product: Product) => void;
    isEditing: boolean; // Thêm prop này để biết có đang chỉnh sửa hay không
}

const ProductSpecForm = ({ product, setProduct, isEditing }: Props) => {
  const [groupName, setGroupName] = useState("");

  const handleChange = (group: string, index: number, key: string, value: string | number) => {
    const newSpecs = [...(product.specificationGroups[group] || [])];
    (newSpecs[index] as any)[key] = value;

    setProduct({
      ...product,
      specificationGroups: {
        ...product.specificationGroups,
        [group]: newSpecs,
      },
    });
  };

  const handleDelete = (group: string, index: number) => {
    const updatedGroup = product.specificationGroups[group].filter((_, i) => i !== index);
    setProduct({
      ...product,
      specificationGroups: {
        ...product.specificationGroups,
        [group]: updatedGroup,
      },
    });
  };

  const handleAdd = (group: string) => {
    const newSpec = { name: "", value: "", displayOrder: 0 };
    const current = product.specificationGroups[group] || [];
    setProduct({
      ...product,
      specificationGroups: {
        ...product.specificationGroups,
        [group]: [...current, newSpec],
      },
    });
  };

  const handleNewGroup = () => {
    if (!groupName.trim()) return;
    setProduct({
      ...product,
      specificationGroups: {
        ...product.specificationGroups,
        [groupName]: [],
      },
    });
    setGroupName("");
  };

  return (
    <div>
      {Object.entries(product.specificationGroups).map(([group, specs]) => (
        <div key={group} className="mb-4 border rounded p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-2">📌 {group}</h6>
            <Button size="sm" variant="outline-success" 
              disabled={!isEditing} // ❗ nếu đang chỉnh sửa thì disable
            onClick={() => handleAdd(group)}>+ Thêm dòng</Button>
          </div>
          {specs.map((spec, index) => (
            <Row className="mb-2" key={index}>
              <Col md={4}>
                <Form.Control
                  placeholder="Tên thông số"
                  value={spec.name}
                  onChange={(e) => handleChange(group, index, "name", e.target.value)}
                />
              </Col>
              <Col md={5}>
                <Form.Control
                  placeholder="Giá trị"
                  value={spec.value}
                  onChange={(e) => handleChange(group, index, "value", e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  placeholder="Thứ tự"
                  type="number"
                  value={spec.displayOrder}
                  onChange={(e) => handleChange(group, index, "displayOrder", +e.target.value)}
                />
              </Col>
              <Col md={1}>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(group, index)}>
                  ✖
                </Button>
              </Col>
            </Row>
          ))}
        </div>
      ))}

      <Form.Group className="d-flex gap-2">
        <Form.Control
          placeholder="Tên nhóm mới"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Button variant="primary" 
          disabled={!isEditing} // ❗ nếu đang chỉnh sửa thì disable
        onClick={handleNewGroup}>➕ Thêm nhóm</Button>
      </Form.Group>
    </div>
  );
};

export default ProductSpecForm;