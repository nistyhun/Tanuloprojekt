import type { CreateOrder, OrderDetails, UpdateOrder } from "@/app/types/order";
import type { OrdersResponseDto } from "./dto/orders-response";

export interface OrderRepository {
  getOrders(page: number, size: number): Promise<OrdersResponseDto>;
  getOrderById(id: string): Promise<OrderDetails>;
  createOrder(order: CreateOrder): Promise<void>;
  updateOrder(id: string, order: UpdateOrder): Promise<void>;
  deleteOrder(id: string): Promise<void>;
}
