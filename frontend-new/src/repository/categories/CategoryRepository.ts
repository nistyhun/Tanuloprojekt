import type { Category } from "@/feature/orders/types/order";

export interface CategoryRepository {
  getCategories(): Promise<Category[]>;
}
