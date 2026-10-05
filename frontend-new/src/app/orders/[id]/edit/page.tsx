"use client";

import type { Category, UpdateOrder } from "@/app/types/order";
import { OrderDetails } from "@/app/types/order";
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    async function fetchOrderDetails() {
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
      console.log(data);
      setCustomerName(data.customerName);
      setPublisherName(data.publisherName);
      setDeadline(data.deadline);
      setQuantity(data.quantity);
      setCategoryId(data.category.id);
    }

    async function fetchCategories() {
      const response = await fetch("http://localhost:8080/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return;
      }

      const data: Category[] = await response.json();
      setCategories(data);
    }

    fetchOrderDetails();
    fetchCategories();
  }, [params.id]);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const newErrors = {
      customerName: "",
      publisherName: "",
      categoryId: "",
      deadline: "",
      quantity: "",
    };

    if (!customerName.trim()) {
      newErrors.customerName = "A megrendelő megadása kötelező.";
    }

    if (!publisherName.trim()) {
      newErrors.publisherName = "A kiadó megadása kötelező";
    }

    if (categoryId === 0) {
      newErrors.categoryId = "Válassz kategóriát.";
    }

    if (!deadline) {
      newErrors.deadline = "A határidő megadása kötelező";
    }

    if (quantity < 1) {
      newErrors.quantity = "A mennyiség legalább 1 legyen";
    }

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

    const response = await fetch(`http://localhost:8080/orders/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedOrder),
    });

    if (!response.ok) {
      console.log("Sikertelen módosítás");
      return;
    }
    console.log("Sikeres módosítás");
    router.push(`/orders/${params.id}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Rendelés szerkesztése</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="customerName">Megrendelő</label>
            <input
              type="text"
              id="customerName"
              className="border border-gray-400 rounded-md p-1"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            ></input>
            {errors.customerName && (
              <p className="text-sm text-red-500">{errors.customerName}</p>
            )}
            <label htmlFor="publisherName">Kiadó</label>
            <input
              type="text"
              id="publisherName"
              name="publisherName"
              className="border border-gray-400 rounded-md p-1"
              value={publisherName}
              onChange={(e) => setPublisherName(e.target.value)}
            ></input>
            {errors.publisherName && (
              <p className="text-sm text-red-500">{errors.publisherName}</p>
            )}
            <label htmlFor="category">Kategória</label>
            <select
              id="category"
              name="category"
              className="border border-gray-400 rounded-md p-1"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              <option value="0">Válassz kategóriát</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.type}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-500">{errors.categoryId}</p>
            )}
            <label htmlFor="deadline">Határidő</label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              className="border border-gray-400 rounded-md p-1"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            ></input>
            {errors.deadline && (
              <p className="text-sm text-red-500">{errors.deadline}</p>
            )}
            <label htmlFor="quantity">Mennyiség</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              className="border border-gray-400 rounded-md p-1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            ></input>
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity}</p>
            )}
          </div>
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
