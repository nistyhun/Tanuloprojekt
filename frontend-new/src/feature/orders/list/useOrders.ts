"use client";

import { useAuthError } from "@/app/hooks/useAuthError";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import type { Order } from "@/app/types/order";
import { RemoteOrderRepository } from "@/repository/orders/RemoteOrderRepository";
import { useEffect, useState } from "react";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersError, setOrdersError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getAuthToken = useRequireAuth();
  const handleAuthError = useAuthError();

  useEffect(() => {
    if (!getAuthToken()) return;

    let ignore = false;

    const fetchOrders = async () => {
      try {
        const data = await new RemoteOrderRepository().getOrders();

        if (!ignore) {
          setOrders(data);
        }
      } catch (error) {
        if (ignore) return;

        if (handleAuthError(error)) return;

        console.error("A rendelések lekérési hibája:", error);
        setOrdersError("Nem sikerült betölteni a rendeléseket.");
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
  }, [getAuthToken, handleAuthError]);

  return { orders, ordersError, isLoading };
};
