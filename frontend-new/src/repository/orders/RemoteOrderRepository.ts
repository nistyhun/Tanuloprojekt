import { apiClient } from "@/api/api-client";
import { endpoints } from "@/api/endpoints";
import type {
  CreateOrder,
  Order,
  OrderDetails,
  UpdateOrder,
} from "@/app/types/order";
import { OrdersResponseDto } from "./dto/orders-response";
import { OrderRepository } from "./OrderRepository";

export class RemoteOrderRepository implements OrderRepository {
  async getOrders(): Promise<Order[]> {
    const response = await apiClient.get<OrdersResponseDto>(
      endpoints.orders.list,
    );
    return response.orders;
  }
  async getOrderById(id: string): Promise<OrderDetails> {
    const response = await apiClient.get<OrderDetails>(
      endpoints.orders.byId(id),
    );
    return response;
  }
  async createOrder(order: CreateOrder): Promise<void> {
    await apiClient.post<void, CreateOrder>(endpoints.orders.list, order);
  }
  async updateOrder(id: string, order: UpdateOrder): Promise<void> {
    await apiClient.put<void, UpdateOrder>(endpoints.orders.byId(id), order);
  }
  async deleteOrder(id: string): Promise<void> {
    await apiClient.delete<void>(endpoints.orders.byId(id));
  }
}
