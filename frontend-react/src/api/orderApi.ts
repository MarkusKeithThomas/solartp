
import { Order, OrderRequest } from '../type/order';
import authAPI from './authApi';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createOrder(order: OrderRequest) {
  try {
    const response = await authAPI.post('/orders/add', order);
    return response.data;
  } catch (error: any) {
    console.error('Create order failed:', error.response?.data || error.message);
    throw error;
  }
}

export const fetchOrderByPhone = async (phone: string): Promise<Order[]> => {
  const response = await axios.get(`${API_BASE_URL}/orders/id`, {
    params: { phone },
  });
  console.log('Response:', response.data); // Log the response data
  return response.data.data;
};