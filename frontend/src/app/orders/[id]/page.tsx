"use client";

import { Order } from "@/app/types/order";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/orders/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        if (response.status === 404) {
          setError("A rendelés nem található");
          return;
        }

        if (!response.ok) {
          throw new Error("A rendelés betöltése sikertelen");
        }

        const data: Order = await response.json();

        setOrder(data);
      } catch (error) {
        console.error(error);
        setError("Nem sikerült kapcsolódni a szerverhez");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [params.id, router]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/orders/${params.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        console.error("Hiba történt a rendelés rögzítésekor");
        return;
      }

      router.push("/orders");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Rendelés részletei
      </h1>
      <Link
        href={"/orders"}
        className="w-auto inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 mt-2 mb-2"
      >
        Vissza
      </Link>
      {isLoading ? (
        <p className="mt-4 text-gray-600">Rendelés betöltése...</p>
      ) : error ? (
        <p className="mt-4 text-red-600">{error}</p>
      ) : order ? (
        <div className="mt-4 rounded-lg bg-white p-6 shadow text-gray-900">
          <p>
            <strong>ID:</strong> {order.id}
          </p>

          <p>
            <strong>Megrendelő:</strong> {order.customerName}
          </p>

          <p>
            <strong>Mennyiség:</strong> {order.quantity}
          </p>

          <p>
            <strong>Határidő:</strong> {order.deadline}
          </p>

          <p>
            <strong>Kiadó:</strong> {order.publisherName}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-red-600">Nincs megjeleníthető rendelés.</p>
      )}
      <div>
        <Link
          href={`/orders/${params.id}/edit`}
          className="w-auto inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 mt-2 mb-2 mr-1"
        >
          Szerkesztés
        </Link>
        <button
          type="button"
          className="w-auto inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 mt-2 mb-2 ml-1"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Törlés
        </button>
      </div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900">
              Rendelés törlése
            </h2>

            <p className="mt-3 text-gray-600">
              Biztosan törölni szeretnéd ezt a rendelést?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-300"
              >
                Mégse
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
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
export default OrderPage;
