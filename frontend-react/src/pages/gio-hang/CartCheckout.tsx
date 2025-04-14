import {  Card, Form, ListGroup, Image, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ProductContext";
import { formatMoney } from "../../ultities/formatMoney";
import { formatTitle } from '../../ultities/formatTitle';
import { useProductDetailContext } from "../../context/ProductProvider";
import { PaymentMethodEnum } from "../../type/order";

export function CartCheckout() {
  const { discount,cartItems,calculateTotalPrice,setSelectedPayment,selectedPayment } = useShoppingCart();
  const {productListRedis} = useProductDetailContext();


  // Tính tổng tiền
  const totalPrice = calculateTotalPrice();

  return (
    <div className="container">
            <h3 className="fw-bold">Giỏ hàng của bạn</h3>
            <ListGroup variant="flush">
              {cartItems.map((cartItem) => {
                const item = productListRedis.find((product) => product.id === cartItem.id);
                if (!item) return null;

                return (
                  <ListGroup.Item key={cartItem.id} className="d-flex align-items-center">
                    <Image src={item.images.find(item => item.isThumbnail)?.imageUrl} alt={item.name} width={75} height={75} className="rounded" />
                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-1">{formatTitle(item.name)}</h6>
                      <small className="text-muted">{formatMoney(item.newPrice)} 
                        × {cartItem.quantity} 
                        = {formatMoney(item.newPrice*cartItem.quantity)}</small>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <Card className="p-4 rounded-4 shadow-sm border-0">      
      {/* Tổng tiền */}
      <div className="mt-3">
        <Stack direction="horizontal" className="justify-content-between">
          <span className="text-muted">Thành tiền:</span>
          <span className="fw-bold">{formatMoney(totalPrice)}</span>
        </Stack>
        <Stack direction="horizontal" className="justify-content-between">
          <span className="text-muted">Giảm giá:</span>
          <span className="fw-bold">{formatMoney(discount)}</span>
        </Stack>
        <Stack direction="horizontal" className="justify-content-between">
          <span className="text-muted">Phí vận chuyển:</span>
          <span className="fw-bold"></span>
        </Stack>
        <Stack direction="horizontal" className="justify-content-between mt-2">
          <span className="fs-6 fw-bold">Tổng thanh toán tạm tính:</span>
          <span className="fs-6 fw-bold text-primary">{formatMoney(totalPrice-discount)}</span>
        </Stack>
      </div>

      {/* Danh sách phương thức thanh toán */}
      <div className="mt-4">
  <Form>
    {/* Thanh toán khi nhận hàng */}
    <div className={`payment-option ${selectedPayment === PaymentMethodEnum.COD ? "active" : ""}`} 
      onClick={() => setSelectedPayment(PaymentMethodEnum.COD)}>
      <Form.Check 
        type="radio" 
        name="payment" 
        id="cod" 
        checked={selectedPayment === PaymentMethodEnum.COD} 
        onChange={() => setSelectedPayment(PaymentMethodEnum.COD)} 
        className="me-2"
      />
      <label htmlFor="COD" className="w-100">Thanh toán khi nhận hàng</label>
    </div>

    {/* Thanh toán tại cửa hàng */}
    <div className={`payment-option ${selectedPayment === PaymentMethodEnum.STORE ? "active" : ""}`} 
      onClick={() => setSelectedPayment(PaymentMethodEnum.STORE)}>
      <Form.Check 
        type="radio" 
        name="payment" 
        id="store" 
        checked={selectedPayment ===PaymentMethodEnum.STORE} 
        onChange={() => setSelectedPayment(PaymentMethodEnum.STORE)} 
        className="me-2"
      />
      <label htmlFor="store" className="w-100">Thanh toán tại cửa hàng</label>
    </div>
  </Form>
</div>
    </Card>
    </div>
  );
}