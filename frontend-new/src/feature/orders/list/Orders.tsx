"use client";

import { OrderCard } from "@/components/orders/OrderCard";
import { Button, ButtonLink } from "@/components/ui/button";
import { useOrders } from "@/feature/orders/list/useOrders";
import { routes } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Orders = () => {
  const router = useRouter();

  const { orders, ordersError, isLoading, totalCount, page, totalPages } =
    useOrders();

  useEffect(() => {
    if (isLoading || ordersError || totalPages === 0) return;

    if (page > totalPages) {
      router.replace(`${routes.orders}?page=${totalPages}`);
    }
  }, [page, totalPages, isLoading, ordersError, router]);

  return (
    <main className="flex flex-col gap-4 bg-gray-100 p-4">
      <div className="flex items-center justify-between mt-2">
        <h1>Rendelések</h1>
        <ButtonLink variant="primary" href={routes.orderNew}>
          Új rendelés
        </ButtonLink>
      </div>
      {!ordersError && !isLoading && <p>Rendelések száma: {totalCount}</p>}
      {ordersError && <p className="text-sm text-red-500">{ordersError}</p>}
      {isLoading && <p className="text-gray-500">Rendelések betöltése...</p>}
      {!isLoading && !ordersError && orders.length === 0 && (
        <p className="text-gray-500">
          {totalCount === 0
            ? "Még nincsenek rendelések."
            : "Ezen az oldalon nincsenek rendelések."}
        </p>
      )}
      {!isLoading && !ordersError && orders.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
      {!isLoading && !ordersError && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
            variant="secondary"
            disabled={page <= 1}
            onClick={() => router.push(`${routes.orders}?page=${page - 1}`)}
          >
            Előző
          </Button>

          <span>
            {page} / {totalPages} oldal
          </span>

          <Button
            type="button"
            variant="secondary"
            disabled={page >= totalPages}
            onClick={() => router.push(`${routes.orders}?page=${page + 1}`)}
          >
            Következő
          </Button>
        </div>
      )}
    </main>
  );
};
