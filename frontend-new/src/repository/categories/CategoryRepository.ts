import type { Category } from "@/app/types/order";

export interface CategoryRepository {
  getCategories(): Promise<Category[]>;
}
