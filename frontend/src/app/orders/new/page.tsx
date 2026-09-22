"use client";

import type { Category } from "@/app/types/category";
import type { OrderForm, OrderFormErrors } from "@/app/types/orderForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NewOrderPage = () => {
  const [form, setForm] = useState<OrderForm>({
    categoryId: 0,
    customerName: "",
    deadline: "",
    quantity: 1,
    publisherName: "",
  });

  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [orderError, setOrderError] = useState("");
  const [validationErrors, setValidationErrors] = useState<OrderFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(form);

  useEffect(() => {
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
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: OrderFormErrors = {};

    if (form.categoryId === 0) {
      errors.categoryId = "Válassz kategóriát";
    }

    if (form.customerName.trim() === "") {
      errors.customerName = "A megrendelő neve kötelező";
    }

    if (form.deadline === "") {
      errors.deadline = "A határidő megadása kötelező";
    }

    if (form.quantity < 1) {
      errors.quantity = "A mennyiség nem lehet egynél kisebb";
    }

    if (form.publisherName.trim() === "") {
      errors.publisherName = "A kiadó neve kötelező";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setOrderError("");
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        setOrderError("Hiba történt a rendelés rögzítésekor");
        return;
      }

      router.push("/orders");
    } catch (error) {
      console.error(error);
      setOrderError("Nem sikerült kapcsolódni a szerverhez");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-start justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl px-4 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Új rendelés</h1>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {orderError && (
            <div className="rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
              {orderError}
            </div>
          )}
          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Kategória
            </label>
            <select
              id="category"
              className="rounded-lg border border-gray-700 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
              value={form.categoryId}
              onChange={(e) => {
                setForm({ ...form, categoryId: Number(e.target.value) });

                setValidationErrors({
                  ...validationErrors,
                  categoryId: undefined,
                });
              }}
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
            {validationErrors.categoryId && (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.categoryId}
              </p>
            )}
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
              className="rounded-lg border border-gray-700 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
              value={form.customerName}
              onChange={(e) => {
                setForm({
                  ...form,
                  customerName: e.target.value,
                });

                setValidationErrors({
                  ...validationErrors,
                  customerName: undefined,
                });
              }}
            />
            {validationErrors.customerName && (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.customerName}
              </p>
            )}
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
              className="rounded-lg border border-gray-700 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
              value={form.deadline}
              onChange={(e) => {
                const value = e.target.value;
                setForm({
                  ...form,
                  deadline: value,
                });

                setValidationErrors({
                  ...validationErrors,
                  deadline:
                    value === "" ? "A határidő megadása kötelező" : undefined,
                });
              }}
            />
            {validationErrors.deadline && (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.deadline}
              </p>
            )}
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
              id="quantity"
              className="rounded-lg border border-gray-700 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
              min={1}
              value={form.quantity}
              onChange={(e) => {
                setForm({
                  ...form,
                  quantity: Number(e.target.value),
                });

                setValidationErrors({
                  ...validationErrors,
                  quantity: undefined,
                });
              }}
            />
            {validationErrors.quantity && (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.quantity}
              </p>
            )}
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
              className="rounded-lg border border-gray-700 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
              value={form.publisherName}
              onChange={(e) => {
                setForm({
                  ...form,
                  publisherName: e.target.value,
                });

                setValidationErrors({
                  ...validationErrors,
                  publisherName: undefined,
                });
              }}
            />
            {validationErrors.publisherName && (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.publisherName}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-auto rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              {isSubmitting ? "Mentés..." : "Rögzítés"}
            </button>
            <Link
              className="w-auto rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              href={"/orders"}
            >
              Mégse
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};
export default NewOrderPage;
