import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ProductContext";
import { formatTitle } from "../ultities/formatTitle";
import { formatMoney } from "../ultities/formatMoney";
import "../styles/custom.css";

type CartItemProps = {
  id: number;
  quantity: number;
  name: string | undefined;
  imageUrl: string | undefined
  priceNew: number | undefined

};

export function CartItem({ id, quantity, name, imageUrl, priceNew }: CartItemProps) {
  const { removeItem, increaseItemQuantity,decreaseItemQuantity } = useShoppingCart();
  return (
    <Stack key={id} direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={imageUrl}
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <div className="d-flex flex-column small-spacing">
        <h6>{formatTitle(name || "")}</h6>
        <div className="d-flex flex-column">
          <p>{formatMoney(priceNew || 0)}</p>
          <div className="quantity-selector">
          <Button onClick={()=> decreaseItemQuantity(id)} className="quantity-btn">−</Button>
            <p className="fw-bold mb-0">SL: {quantity}</p>
            <Button onClick={()=> increaseItemQuantity(id)} className="quantity-btn">+</Button>
          </div>
        </div>
        {priceNew && <h4 className="mt-1">= {formatMoney(priceNew * quantity)}</h4>}
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
