"use client";

import { ButtonLink } from "@/components/ui/button";
import { useOrders } from "@/feature/orders/list/useOrders";
import { routes } from "@/lib/routes";
import Link from "next/link";

export default function OrdersPage() {
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <article
            key={order.id}
            className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <h2 className="text-lg font-semibold">{order.customerName}</h2>
            <p className="text-sm text-gray-600">
              Kiadó: {order.publisherName}
            </p>
            <p className="text-sm">Határidő: {order.deadline}</p>
            <p className="text-sm">Mennyiség: {order.quantity} db</p>
            <p className="text-sm">
              Részletek:{" "}
              <Link
                className="text-blue-500"
                href={routes.orderDetails(String(order.id))}
              >
                Link
              </Link>
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
