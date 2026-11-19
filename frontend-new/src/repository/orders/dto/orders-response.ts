import type { Order } from "@/feature/orders/types/order";

export type OrdersResponseDto = {
  orders: Order[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
