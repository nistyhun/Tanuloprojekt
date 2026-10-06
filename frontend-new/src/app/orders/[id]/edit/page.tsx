"use client";

import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import type { Category, UpdateOrder } from "@/app/types/order";
import OrderForm from "@/components/orders/OrderForm";
import { getCategories, getOrderById, updateOrder } from "@/lib/api";
import { validateOrder } from "@/lib/validateOrder";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditOrderPage() {
  const params = useParams();
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState({
    customerName: "",
    publisherName: "",
    categoryId: "",
    deadline: "",
    quantity: "",
  });
  const [categoriesError, setCategoriesError] = useState("");
  const [orderError, setOrderError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const getAuthToken = useRequireAuth();

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      return;
    }

    async function fetchOrderDetails(id: string, authToken: string) {
      try {
        const data = await getOrderById(id, authToken);

        setCustomerName(data.customerName);
        setPublisherName(data.publisherName);
        setDeadline(data.deadline);
        setQuantity(data.quantity);
        setCategoryId(data.category.id);
      } catch (error) {
        console.error("A rendelés lekérési hibája:", error);
        setOrderError("Nem sikerült betölteni a rendelés adatait.");
      }
    }

    async function fetchCategories(authToken: string) {
      try {
        const data = await getCategories(authToken);
        setCategories(data);
      } catch {
        setCategoriesError("Nem sikerült betölteni a kategóriákat.");
      }
    }

    const id = params.id;

    if (typeof id !== "string") {
      return;
    }

    fetchOrderDetails(id, token);
    fetchCategories(token);
  }, [getAuthToken, params.id]);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const token = getAuthToken();

    if (!token) {
      return;
    }

    const newErrors = validateOrder({
      customerName,
      publisherName,
      categoryId,
      deadline,
      quantity,
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (hasErrors) {
      return;
    }

    const updatedOrder: UpdateOrder = {
      categoryId,
      customerName,
      deadline,
      quantity,
      publisherName,
    };

    console.log(updatedOrder);

    try {
      await updateOrder(`${params.id}`, updatedOrder, token);
      console.log("Sikeres módosítás");
      router.push(`/orders/${params.id}`);
    } catch (error) {
      console.error("A rendelés módosítása sikertelen:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Ismeretlen hiba történt.",
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <form onSubmit={handleSubmit}>
          <OrderForm
            title="Rendelés szerkesztése"
            customerName={customerName}
            onCustomerNameChange={setCustomerName}
            publisherName={publisherName}
            onPublisherNameChange={setPublisherName}
            categories={categories}
            categoryId={categoryId}
            onCategoryChange={setCategoryId}
            deadline={deadline}
            onDeadlineChange={setDeadline}
            quantity={quantity}
            onQuantityChange={setQuantity}
            errors={errors}
          ></OrderForm>
          {categoriesError && (
            <p className="text-sm text-red-500">{categoriesError}</p>
          )}
          {orderError && <p className="text-sm text-red-500">{orderError}</p>}
          {submitError && <p className="text-sm text-red-500">{submitError}</p>}
          <div className="mt-2">
            <button
              type="submit"
              className="rounded-md bg-blue-500 text-white p-2 mr-2"
            >
              Rögzítés
            </button>
            <Link
              href={`/orders/${params.id}`}
              className="rounded-md bg-gray-500 text-white p-2"
            >
              Vissza
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
