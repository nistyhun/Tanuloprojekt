"use client";

import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import type { Category, CreateOrder } from "@/app/types/order";
import OrderForm from "@/components/orders/OrderForm";
import { createOrder, getCategories } from "@/lib/api";
import { validateOrder } from "@/lib/validateOrder";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateOrderPage() {
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
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  const getAuthToken = useRequireAuth();

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      return;
    }
    async function fetchCategories(authToken: string) {
      try {
        const data = await getCategories(authToken);
        setCategories(data);
      } catch {
        setCategoriesError("Nem sikerült betölteni a kategóriákat.");
      }
    }
    fetchCategories(token);
  }, [getAuthToken]);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

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

    const newOrder: CreateOrder = {
      customerName,
      publisherName,
      categoryId,
      deadline,
      quantity,
    };

    console.log(newOrder);

    const token = getAuthToken();

    if (!token) {
      return;
    }

    setSubmitError("");

    try {
      await createOrder(newOrder, token);
      router.push("/orders");
    } catch (error) {
      console.error("Rendelés mentési hiba", error);
      setSubmitError(
        error instanceof Error ? error.message : "Ismeretlen hiba történt.",
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <OrderForm
            title="Új rendelés rögzítése"
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
          <div className="mt-2">
            <button
              type="submit"
              className="rounded-md bg-blue-500 p-2 text-white mr-2"
            >
              Rögzítés
            </button>
            <Link
              href={"/orders"}
              className="rounded-md bg-gray-500 text-white p-2"
            >
              Vissza
            </Link>
          </div>
          {submitError && <p className="text-sm text-red-500">{submitError}</p>}
        </form>
      </section>
    </main>
  );
}
