"use client";

import { useAuthError } from "@/app/hooks/useAuthError";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import type {
  Category,
  CreateOrder as CreateOrderDto,
} from "@/app/types/order";
import { routes } from "@/lib/routes";
import { RemoteCategoryRepository } from "@/repository/categories/RemoteCategoryRepository";
import { RemoteOrderRepository } from "@/repository/orders/RemoteOrderRepository";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { orderFormSchema } from "../order-form-schema";

export const useCreateOrder = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesError, setCategoriesError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const getAuthToken = useRequireAuth();
  const handleAuthError = useAuthError();

  const form = useForm({
    defaultValues: {
      customerName: "",
      publisherName: "",
      categoryId: 0,
      deadline: "",
      quantity: 1,
    },
    validators: {
      onChange: orderFormSchema,
    },
    onSubmit: async ({ value }) => {
      const token = getAuthToken();

      if (!token) return;

      setSubmitError("");

      try {
        const newOrder: CreateOrderDto = value;

        await new RemoteOrderRepository().createOrder(newOrder);

        router.push(routes.orders);
      } catch (error) {
        if (handleAuthError(error)) return;

        console.error("Rendelés mentési hiba", error);

        setSubmitError(
          error instanceof Error ? error.message : "Ismeretlen hiba történt.",
        );
      }
    },
  });

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      return;
    }

    async function fetchCategories() {
      try {
        const data = await new RemoteCategoryRepository().getCategories();
        setCategories(data);
      } catch (error) {
        if (handleAuthError(error)) {
          return;
        }
        setCategoriesError("Nem sikerült betölteni a ketegóriákat.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, [getAuthToken, handleAuthError]);

  return {
    categories,
    categoriesError,
    isLoading,
    submitError,
    setSubmitError,
    form,
  };
};
