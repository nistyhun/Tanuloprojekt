"use client";

import { useAuthError } from "@/app/hooks/useAuthError";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import type { OrderDetails } from "@/app/types/order";
import { deleteOrder, getOrderById } from "@/lib/api";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailsPage() {
  const params = useParams();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const [deleteError, setDeleteError] = useState("");
  const [orderError, setOrderError] = useState("");
  const getAuthToken = useRequireAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleAuthError = useAuthError();

  async function handleDelete() {
    const token = getAuthToken();
    const id = params.id;
    if (!token || typeof id !== "string") {
      return;
    }
    setDeleteError("");
    setIsDeleting(true);
    try {
      await deleteOrder(id, token);
      setIsDeleteModalOpen(false);
      router.push("/orders");
    } catch (error) {
      if (handleAuthError(error)) {
        return;
      }
      console.error("A rendelés törlése sikertelen:", error);
      setDeleteError("Nem sikerült törölni a rendelést.");
    } finally {
      setIsDeleting(false);
    }
  }

  useEffect(() => {
    const token = getAuthToken();
    const id = params.id;

    if (!token || typeof id !== "string") {
      return;
    }

    async function fetchOrder(orderId: string, authToken: string) {
      try {
        const data = await getOrderById(orderId, authToken);
        setOrder(data);
        console.log(data);
      } catch (error) {
        if (handleAuthError(error)) {
          return;
        }
        console.error("A rendelés lekérési hibája:", error);
        setOrderError("Nem sikerült betölteni a rendelést.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrder(id, token);
  }, [handleAuthError, getAuthToken, params.id]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Rendelés részletei</h2>
        {isLoading && <p className="mb-4 text-sm">Rendelés betöltése...</p>}
        {orderError && (
          <>
            <p className="mb-4 text-sm text-red-500">{orderError}</p>
            <Link
              href={"/orders"}
              className="cursor-pointer rounded-md bg-gray-500 text-white p-2"
            >
              Vissza
            </Link>
          </>
        )}
        {order && (
          <>
            <p>Rendelés id: {params.id}</p>
            <p>Megrendelő: {order.customerName}</p>
            <p>Kiadó: {order.publisherName}</p>
            <p>Kategória: {order.category.type}</p>
            <p>Határidő: {order.deadline}</p>
            <p>Mennyiség: {order.quantity} db</p>
            <div className="mt-2">
              <Link
                href={`/orders/${params.id}/edit`}
                className="mr-2 cursor-pointer rounded-md bg-blue-600 p-2 text-white"
              >
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
          </>
        )}
      </section>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Rendelés törlése</h2>

            <p className="mt-2">Biztosan törölni szeretnéd ezt a rendelést?</p>
            {deleteError && (
              <p className="mt-2 text-sm text-red-500">{deleteError}</p>
            )}
            <div className="mt-4">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteError("");
                }}
                disabled={isDeleting}
                className="mr-2 cursor-pointer rounded-md bg-gray-500 p-2 text-white"
              >
                Mégse
              </button>

              <button
                onClick={handleDelete}
                className="cursor-pointer rounded-md bg-red-500 p-2 text-white"
                disabled={isDeleting}
              >
                {isDeleting ? "Törlés..." : "Törlés"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
