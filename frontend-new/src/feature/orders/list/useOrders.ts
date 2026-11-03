"use client";

import { useAuthError } from "@/app/hooks/useAuthError";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import type { Order } from "@/app/types/order";
import { getErrorMessage } from "@/lib/get-error-message";
import { RemoteOrderRepository } from "@/repository/orders/RemoteOrderRepository";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersError, setOrdersError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page") ?? 1);
  const page = Number.isInteger(pageParam) && pageParam >= 1 ? pageParam : 1;
  const size = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const getAuthToken = useRequireAuth();
  const handleAuthError = useAuthError();

  useEffect(() => {
    if (!getAuthToken()) return;

    let ignore = false;

    const fetchOrders = async () => {
      setIsLoading(true);
      setOrdersError("");
      try {
        const data = await new RemoteOrderRepository().getOrders(page, size);

        if (!ignore) {
          setOrders(data.orders);
          setTotalPages(data.totalPages);
          setTotalCount(data.totalCount);
        }
      } catch (error) {
        if (ignore) return;

        if (handleAuthError(error)) return;

        console.error("A rendelések lekérési hibája:", error);
        setOrdersError(getErrorMessage(error));
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void fetchOrders();

    return () => {
      ignore = true;
    };
  }, [page, getAuthToken, handleAuthError]);

  return {
    orders,
    ordersError,
    isLoading,
    page,
    totalPages,
    totalCount,
  };
};
