"use client";

import { OrderCard } from "@/components/orders/OrderCard";
import { ButtonLink } from "@/components/ui/button";
import { useOrders } from "@/feature/orders/list/useOrders";
import { routes } from "@/lib/routes";

export const Orders = () => {
  const { orders, ordersError, isLoading } = useOrders();

  return (
    <main className="flex flex-col gap-4 bg-gray-100 p-4">
      <div className="flex items-center justify-between mt-2">
        <h1>Rendelések</h1>
        <ButtonLink variant="primary" href={routes.orderNew}>
          Új rendelés
        </ButtonLink>
      </div>
      {!ordersError && !isLoading && <p>Rendelések száma: {orders.length}</p>}
      {ordersError && <p className="text-sm text-red-500">{ordersError}</p>}
      {isLoading && <p className="text-gray-500">Rendelések betöltése...</p>}
      {!isLoading && !ordersError && orders.length === 0 && (
        <p className="text-gray-500">Még nincsenek rendelések.</p>
      )}
      {!isLoading && !ordersError && orders.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </main>
  );
};
