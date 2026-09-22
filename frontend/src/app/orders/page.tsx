"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Order } from "../types/order";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch("http://localhost:8080/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("A rendelések betöltése sikertelen");
        }

        const data: Order[] = await response.json();

        setOrders(data);
      } catch (error) {
        console.error(error);
        setError("Nem sikerült betölteni a rendeléseket");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Betöltés...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Rendelések</h1>

            <p className="mt-1 text-sm text-gray-500">
              Aktuális rendelések listája
            </p>
          </div>
          {user?.role === "ADMIN" && (
            <div className="mb-2">
              <Link
                href="/orders/new"
                className="w-auto rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                Új rendelés
              </Link>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl bg-white p-4 shadow-sm">
              <h2 className="font-semibold text-gray-900">
                {order.customerName}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Kiadó: {order.publisherName}
              </p>

              <p className="text-sm text-gray-500">
                Mennyiség: {order.quantity}
              </p>

              <p className="text-sm text-gray-500">
                Határidő: {order.deadline}
              </p>
              <Link href={`orders/${order.id}`} className="text-blue-400">
                Részletek
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default OrdersPage;
