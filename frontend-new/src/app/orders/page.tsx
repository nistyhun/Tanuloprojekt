"use client";

import { getOrders } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { Order } from "../types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersError, setOrdersError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const getAuthToken = useRequireAuth();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;

    async function fetchOrders(authToken: string) {
      try {
        const data = await getOrders(authToken);
        setOrders(data);
        console.log(data);
      } catch (error) {
        console.error("A rendelések lekérési hibája:", error);
        setOrdersError("Nem sikerült betölteni a rendeléseket.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders(token);
  }, [getAuthToken]);

  return (
    <main className="flex flex-col gap-4">
      <div className="flex items-center justify-between mt-2">
        <h1>Rendelések</h1>
        <Link
          href={"/orders/new"}
          className="cursor-pointer rounded-md bg-blue-600 p-2 text-white"
        >
          Új rendelés
        </Link>
      </div>
      <p>Rendelések száma: {orders.length}</p>
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
              <Link className="text-blue-500" href={`/orders/${order.id}`}>
                Link
              </Link>
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
