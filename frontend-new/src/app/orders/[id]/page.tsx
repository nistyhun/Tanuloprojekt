"use client";

import { OrderDetails } from "@/app/types/order";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailsPage() {
  const params = useParams();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await fetch(`http://localhost:8080/orders/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return;
    }
    console.log("Sikeres törlés");
    setIsDeleteModalOpen(false);
    router.push("/orders");
  }
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    async function fetchOrder() {
      const response = await fetch(
        `http://localhost:8080/orders/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        return;
      }
      const data: OrderDetails = await response.json();
      setOrder(data);
      console.log(data);
    }
    fetchOrder();
  }, [params.id]);
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Rendelés részletei</h2>
        <p>Rendelés id: {params.id}</p>
        {order && (
          <>
            <p>Megrendelő: {order.customerName}</p>
            <p>Kiadó: {order.publisherName}</p>
            <p>Kategória: {order.category.type}</p>
            <p>Határidő: {order.deadline}</p>
            <p>Mennyiség: {order.quantity} db</p>
          </>
        )}
        <div className="mt-2">
          <Link href={`/orders/${params.id}/edit`} className="mr-2 cursor-pointer rounded-md bg-blue-600 p-2 text-white">
            Szerkesztés
          </Link>
          <button
            className="mr-2 cursor-pointer rounded-md bg-red-500 p-2 text-white"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Törlés
          </button>
          <Link
            href={"/orders"}
            className="cursor-pointer rounded-md bg-gray-500 text-white p-2"
          >
            Vissza
          </Link>
        </div>
      </section>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Rendelés törlése</h2>

            <p className="mt-2">Biztosan törölni szeretnéd ezt a rendelést?</p>

            <div className="mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="mr-2 cursor-pointer rounded-md bg-gray-500 p-2 text-white"
              >
                Mégse
              </button>

              <button
                onClick={handleDelete}
                className="cursor-pointer rounded-md bg-red-500 p-2 text-white"
              >
                Törlés
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
