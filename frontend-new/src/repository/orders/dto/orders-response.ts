import type { Order } from "@/app/types/order";

export type OrdersResponseDto = {
  orders: Order[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
