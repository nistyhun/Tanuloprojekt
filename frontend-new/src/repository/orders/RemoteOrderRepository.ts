import type {
  CreateOrder,
  OrderDetails,
  UpdateOrder,
} from "@/feature/orders/types/order";
import { apiClient } from "@/lib/api/api-client";
import { endpoints } from "@/lib/api/endpoints";
import { OrdersResponseDto } from "./dto/orders-response";
import { OrderRepository } from "./OrderRepository";

export class RemoteOrderRepository implements OrderRepository {
  async getOrders(page: number, size: number): Promise<OrdersResponseDto> {
    return apiClient.get<OrdersResponseDto>(
      `${endpoints.orders.list}?page=${page}&size=${size}`,
    );
  }
  async getOrderById(id: string): Promise<OrderDetails> {
    const response = await apiClient.get<OrderDetails>(
      endpoints.orders.byId(id),
    );
    return response;
  }
  async createOrder(order: CreateOrder): Promise<void> {
    await apiClient.post<void, CreateOrder>({
      endpoint: endpoints.orders.list,
      body: order,
      requiresAuth: true,
    });
  }
  async updateOrder(id: string, order: UpdateOrder): Promise<void> {
    await apiClient.put<void, UpdateOrder>(endpoints.orders.byId(id), order);
  }
  async deleteOrder(id: string): Promise<void> {
    await apiClient.delete<void>(endpoints.orders.byId(id));
  }
}
