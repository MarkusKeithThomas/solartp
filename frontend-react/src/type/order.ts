
export enum PaymentMethodEnum {
  COD = 'COD',
  VNPAY = "VNPAY",
  MOMO = "MOMO",
  STORE= "STORE",
}
export type AddressType = 'HOME' | 'OFFICE' | 'OTHER';

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface ShippingAddressRequest {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  province: string;
  district: string;
  ward: string;
  addressNote: string;
  type: AddressType;
}

export interface OrderRequest {
  userId?: number; // optional vì có thể là null
  cartId: number;
  voucherCode?: string;
  unit: string;
  note: string;
  paymentMethod: PaymentMethodEnum;
  shippingAddress: ShippingAddressRequest;
  orderItems: OrderItemRequest[];
}

export interface statusShowShipping {
  orderCode: string;
  orderStatus: OrderStatus;
}

export enum OrderStatus {
  PLACED = "PLACED",
  CONFIRMED = "CONFIRMED",
  WAITING_FOR_PICKUP = "WAITING_FOR_PICKUP",
  DELIVERING = "DELIVERING",
  COMPLETED = "COMPLETED",
}


export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  province: string;
  district: string;
  ward: string;
  addressNote: string;
  type: "HOME" | "OFFICE" | string; // mở rộng nếu backend có thêm type khác
}

export interface OrderItem {
  productSku: string;
  productName: string;
  thumbnailUrl: string | null;
  unit: string | null;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Order {
  id: number;
  orderCode: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: PaymentMethodEnum;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  note: string;
  createdAt: string; // ISO DateTime (ex: 2025-04-13T16:20:44)
  shippingAddress: ShippingAddress;
  items: OrderItem[];
}
export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  CANCELED = "CANCELED",
}