"use client";

import type { Category } from "@/app/types/category";
import { Order } from "@/app/types/order";
import type { OrderForm } from "@/app/types/orderForm";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditOrderPage = () => {
  const [form, setForm] = useState<OrderForm>({
    categoryId: 0,
    customerName: "",
    deadline: "",
    quantity: 1,
    publisherName: "",
  });
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

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

        console.log("Beolvasott rendelés:", data);

        setOrder(data);

        setForm({
          categoryId: data.category.id,
          customerName: data.customerName,
          deadline: data.deadline,
          quantity: data.quantity,
          publisherName: data.publisherName,
        });
      } catch (error) {
        console.error(error);
        setError("Nem sikerült kapcsolódni a szerverhez");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }
        const response = await fetch("http://localhost:8080/categories", {
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
          throw new Error("A kategóriák betöltése sikertelen");
        }

        const data: Category[] = await response.json();

        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderDetails();
    fetchCategories();
  }, [params.id, router]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("PUT body:", form);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/orders/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        },
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        setError("A rendelés módosítása sikertelen");
        return;
      }

      router.push(`/orders/${params.id}`);
    } catch (error) {
      console.error(error);
      setError("Nem sikerült kapcsolódni a szerverhez");
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-start bg-gray-100 p-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl px-4 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Rendelés szerkesztése
        </h1>
        <div className="items-center justify-center">
          <form
            className="mx-auto mt-6 max-w-md space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Kategória
              </label>
              <select
                id="category"
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: Number(e.target.value) })
                }
                className="rounded-lg border border-gray-700 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
              >
                <option value={0} key={0}>
                  Válassz kategóriát
                </option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="customerName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Megrendelő
              </label>
              <input
                type="text"
                id="customerName"
                value={form.customerName}
                onChange={(e) =>
                  setForm({ ...form, customerName: e.target.value })
                }
                className="rounded-lg border border-gray-700 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="deadline"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Határidő
              </label>
              <input
                type="date"
                id="deadline"
                value={form.deadline}
                onChange={(e) =>
                  setForm({
                    ...form,
                    deadline: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-700 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Mennyiség
              </label>
              <input
                type="number"
                min={1}
                id="quantity"
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: Number(e.target.value) })
                }
                className="rounded-lg border border-gray-700 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="publisherName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Kiadó
              </label>
              <input
                type="text"
                id="publisherName"
                value={form.publisherName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    publisherName: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-700 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="w-auto rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                Mentés
              </button>
              <Link
                className="w-auto rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                href={`/orders/${params.id}`}
              >
                Mégse
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
export default EditOrderPage;
