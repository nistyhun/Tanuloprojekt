"use client";

import { routes } from "@/lib/routes";
import Link from "next/link";
import { useOrderDetails } from "./useOrderDetails";

export const OrderDetails = () => {
  const {
    id,
    order,
    isDeleteModalOpen,
    deleteError,
    orderError,
    isLoading,
    isDeleting,
    handleDelete,
    openDeleteModal,
    closeDeleteModal,
  } = useOrderDetails();

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
            <p>Rendelés id: {id}</p>
            <p>Megrendelő: {order.customerName}</p>
            <p>Kiadó: {order.publisherName}</p>
            <p>Kategória: {order.category.type}</p>
            <p>Határidő: {order.deadline}</p>
            <p>Mennyiség: {order.quantity} db</p>
            <div className="mt-2">
              <Link
                href={routes.orderEdit(id)}
                className="mr-2 cursor-pointer rounded-md bg-blue-600 p-2 text-white"
              >
                Szerkesztés
              </Link>
              <button
                className="mr-2 cursor-pointer rounded-md bg-red-500 p-2 text-white"
                onClick={openDeleteModal}
              >
                Törlés
              </button>
              <Link
                href={routes.orders}
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
                onClick={closeDeleteModal}
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
};
