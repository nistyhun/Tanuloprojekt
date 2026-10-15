import { apiClient } from "@/api/api-client";
import { endpoints } from "@/api/endpoints";
import type { Category } from "@/app/types/order";
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
