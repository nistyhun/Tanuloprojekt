import type {
  CreateOrder,
  Order,
  OrderDetails,
  UpdateOrder,
} from "@/app/types/order";

export interface OrderRepository {
  getOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<OrderDetails>;
  createOrder(order: CreateOrder): Promise<void>;
  updateOrder(id: string, order: UpdateOrder): Promise<void>;
  deleteOrder(id: string): Promise<void>;
}
