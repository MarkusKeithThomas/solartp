import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ProductContext";
import "../../styles/custom.css";
import { CartItem } from "../../components/CartItem";
import { useProductDetailContext } from "../../context/ProductProvider";
type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const {productListRedis } = useProductDetailContext();
  const productMap = new Map(
    productListRedis.map((product) => [product.id, product])
  );
  const enrichedCartItems = cartItems.map((item) => {
    const product = productMap.get(item.id);
    return {
      ...item,
      name: product?.name || "Không tìm thấy",
      imageUrl: product?.images?.find((img) => img.isThumbnail)?.imageUrl || "",
      priceNew: product?.newPrice,
    };
  });

  return (
    <>
      <Offcanvas
        show={isOpen}
        onHide={closeCart}
        placement="end"
        className="offcanvas-mobile"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Giỏ hàng</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {enrichedCartItems.map((item) => (
              <CartItem {...item} />
            ))}

            <h3>
              Total:{" "}
              {cartItems
                .reduce((total, item) => {
                  const itemData = productListRedis.find(
                    (storeItem) => storeItem.id === item.id
                  );
                  return total + (itemData?.newPrice || 0) * item.quantity;
                }, 0)
                .toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
            </h3>
          </Stack>
        </Offcanvas.Body>
        <div className="offcanvas-footer mb-3 m-3">
          <Button
            href="/thanh-toan"
            variant="primary"
            style={{ width: "100%", backgroundColor: "#00879E" }}
          >
            Đặt Hàng
          </Button>
        </div>
      </Offcanvas>
    </>
  );
}
