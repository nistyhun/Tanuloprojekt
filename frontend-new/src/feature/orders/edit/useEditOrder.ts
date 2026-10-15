"use client";

import { useAuthError } from "@/app/hooks/useAuthError";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import type { Category, UpdateOrder } from "@/app/types/order";
import { routes } from "@/lib/routes";
import { RemoteCategoryRepository } from "@/repository/categories/RemoteCategoryRepository";
import { RemoteOrderRepository } from "@/repository/orders/RemoteOrderRepository";
import { useForm } from "@tanstack/react-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { orderFormSchema } from "../order-form-schema";

const defaultOrderValues = {
  customerName: "",
  publisherName: "",
  categoryId: 0,
  deadline: "",
  quantity: 1,
};

export const useEditOrder = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  const params = useParams();
  const orderId = typeof params.id === "string" ? params.id : "";
  const getAuthToken = useRequireAuth();
  const handleAuthError = useAuthError();

  const [categoriesError, setCategoriesError] = useState("");
  const [orderError, setOrderError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  const [initialValues, setInitialValues] = useState(defaultOrderValues);

  const form = useForm({
    defaultValues: initialValues,
    validators: {
      onChange: orderFormSchema,
    },
    onSubmit: async ({ value }) => {
      const token = getAuthToken();

      if (!token || !orderId) {
        return;
      }

      setSubmitError("");

      try {
        const updatedOrder: UpdateOrder = value;

        await new RemoteOrderRepository().updateOrder(orderId, updatedOrder);

        router.push(routes.orderDetails(orderId));
      } catch (error) {
        if (handleAuthError(error)) {
          return;
        }

        console.error("A rendelés módosítása sikertelen:", error);

        setSubmitError(
          error instanceof Error ? error.message : "Ismeretlen hiba történt.",
        );
      }
    },
  });

  useEffect(() => {
    let ignore = false;
    const token = getAuthToken();

    if (!token) {
      return;
    }

    async function fetchOrderDetails(id: string) {
      try {
        const data = await new RemoteOrderRepository().getOrderById(id);

        if (ignore) return;

        setInitialValues({
          customerName: data.customerName,
          publisherName: data.publisherName,
          deadline: data.deadline,
          quantity: data.quantity,
          categoryId: data.category.id,
        });
      } catch (error) {
        if (ignore) return;

        if (handleAuthError(error)) {
          return;
        }
        console.error("A rendelés lekérési hibája:", error);
        setOrderError("Nem sikerült betölteni a rendelés adatait.");
      } finally {
        if (!ignore) {
          setIsOrderLoading(false);
        }
      }
    }

    async function fetchCategories() {
      try {
        const data = await new RemoteCategoryRepository().getCategories();

        if (ignore) return;

        setCategories(data);
      } catch (error) {
        if (ignore) return;

        if (handleAuthError(error)) {
          return;
        }
        setCategoriesError("Nem sikerült betölteni a kategóriákat.");
      } finally {
        if (!ignore) {
          setIsCategoriesLoading(false);
        }
      }
    }

    if (!orderId) {
      return;
    }

    fetchOrderDetails(orderId);
    fetchCategories();

    return () => {
      ignore = true;
    };
  }, [orderId, getAuthToken, handleAuthError]);

  return {
    id: orderId,
    categories,
    categoriesError,
    orderError,
    submitError,
    isOrderLoading,
    isCategoriesLoading,
    form,
  };
};
