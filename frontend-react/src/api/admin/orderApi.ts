import { Order } from "../../type/order";
import authAPI from "../authApi";

export const fetchOrdersApi = async (): Promise<Order[]> => {
    const res = await authAPI.get("/orders/admin");
    return res.data.data;
}

export const updateOrderApi = async (orderId: number, newStatus: string): Promise<void> => {
    const res = await authAPI.patch(`/orders/${orderId}/status`, null, {
      params: { newStatus },
    });
    return res.data.code;
  };