"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const EditOrderPage = () => {
  const params = useParams();
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Rendelés szerkesztése
      </h1>
      <Link
        href={`/orders/${params.id}`}
        className="w-auto inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 mt-2 mb-2"
      >
        Vissza
      </Link>
    </main>
  );
};
export default EditOrderPage;
