import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ProductContext";
import storeItem from '../assets/fakedata/dataitem.json';
import { formatTitle } from "../ultities/formatTitle";
import { formatMoney } from "../ultities/formatMoney";
import "../styles/custom.css";
type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeItem, increaseItemQuantity,decreaseItemQuantity } = useShoppingCart();
  const item = storeItem.find((item) => item.id === id);
  if (!item) {
    return null;
  }
  return (
    <Stack direction="horizontal" gap={3} className="d-flex align-items-center">
      <img
        src={item.image}
        style={{ width: "75px", height: "100px", objectFit: "cover" }}
      />
      <div className="d-flex flex-column small-spacing">
        <h6>{formatTitle(item.name)}</h6>
        <div className="d-flex flex-column">
          <p>{formatMoney(item.priceNew)}</p>
          <div className="quantity-selector">
          <Button onClick={()=> decreaseItemQuantity(id)} className="quantity-btn">−</Button>
            <p className="fw-bold mb-0">SL: {quantity}</p>
            <Button onClick={()=> increaseItemQuantity(id)} className="quantity-btn">+</Button>
          </div>
        </div>
        <h4 className="mt-1">= {formatMoney(item.priceNew * quantity)}</h4>
      </div>
      <Button
        onClick={() => removeItem(id)}
        variant="light"
        className="btn btn-light btn-sm rounded-circle ms-auto p-1 hand-on-hover"
      >
        <i className="bi bi-x-circle text-danger fs-5"></i>
      </Button>
    </Stack>
    

  );
}
