import type { Category } from "@/feature/orders/types/order";
import { apiClient } from "@/lib/api/api-client";
import { endpoints } from "@/lib/api/endpoints";
import type { CategoryRepository } from "./CategoryRepository";

type CategoriesResponse = {
  categories: Category[];
};

export class RemoteCategoryRepository implements CategoryRepository {
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<CategoriesResponse>(
      endpoints.categories.list,
    );

    return response.categories;
  }
}
