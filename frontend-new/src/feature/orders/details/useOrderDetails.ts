"use client";

import { useAuthError } from "@/app/hooks/useAuthError";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import type { OrderDetails as OrderDetailsDto } from "@/app/types/order";
import { getErrorMessage } from "@/lib/get-error-message";
import { routes } from "@/lib/routes";
import { RemoteOrderRepository } from "@/repository/orders/RemoteOrderRepository";
import { useParams, useRouter } from "next/navigation";
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

  const getAuthToken = useRequireAuth();
  const handleAuthError = useAuthError();
  const router = useRouter();

  function openDeleteModal() {
    setDeleteError("");
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteError("");
    setIsDeleteModalOpen(false);
  }

  async function handleDelete() {
    const token = getAuthToken();

    if (!token || !orderId) {
      return;
    }
    setDeleteError("");
    setIsDeleting(true);
    try {
      await new RemoteOrderRepository().deleteOrder(orderId);
      setIsDeleteModalOpen(false);
      router.push(routes.orders);
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

    const token = getAuthToken();

    if (!token) {
      return;
    }

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
  }, [orderId, getAuthToken, handleAuthError]);

  return {
    id: orderId,
    order,
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
