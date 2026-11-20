"use client";

import { useAuthError } from "@/feature/auth/hooks/useAuthError";
import type { OrderDetails as OrderDetailsDto } from "@/feature/orders/types/order";
import { getErrorMessage } from "@/lib/get-error-message";
import { routes } from "@/lib/routes";
import { RemoteOrderRepository } from "@/repository/orders/RemoteOrderRepository";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useOrderDetails = () => {
  const [order, setOrder] = useState<OrderDetailsDto | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [orderError, setOrderError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const params = useParams();
  const orderId = typeof params.id === "string" ? params.id : "";

  const handleAuthError = useAuthError();
  const router = useRouter();

  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const backUrl = queryString
    ? `${routes.orders}?${queryString}`
    : routes.orders;

  function openDeleteModal() {
    setDeleteError("");
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteError("");
    setIsDeleteModalOpen(false);
  }

  async function handleDelete() {
    if (!orderId) {
      return;
    }
    setDeleteError("");
    setIsDeleting(true);
    try {
      await new RemoteOrderRepository().deleteOrder(orderId);
      setIsDeleteModalOpen(false);
      router.push(backUrl);
    } catch (error) {
      if (handleAuthError(error)) {
        return;
      }
      console.error("A rendelés törlése sikertelen:", error);
      setDeleteError(getErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    if (!orderId) {
      return;
    }

    async function fetchOrder(id: string) {
      try {
        const data = await new RemoteOrderRepository().getOrderById(id);

        if (ignore) return;

        setOrder(data);
      } catch (error) {
        if (ignore) return;

        if (handleAuthError(error)) {
          return;
        }

        console.error("A rendelés lekérési hibája:", error);
        setOrderError(getErrorMessage(error));
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void fetchOrder(orderId);

    return () => {
      ignore = true;
    };
  }, [orderId, handleAuthError]);

  return {
    id: orderId,
    order,
    backUrl,
    queryString,
    isDeleteModalOpen,
    deleteError,
    isLoading: Boolean(orderId) && isLoading,
    orderError: !orderId ? "Érvénytelen rendelésazonosító." : orderError,
    isDeleting,
    handleDelete,
    openDeleteModal,
    closeDeleteModal,
  };
};
