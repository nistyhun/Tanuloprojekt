"use client"

import { OrderDetails } from "@/app/types/order";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditOrderPage (){
    const params = useParams();
    const [order, setOrder] = useState<OrderDetails | null>(null);

useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        return;
    }

    async function fetchOrderDetails() {
        const response = await fetch(`http://localhost:8080/orders/${params.id}`, { headers: {
            Authorization: `Bearer ${token}`,
        },
    },
    );

    if (!response.ok){
        return;
    }

    const data: OrderDetails = await response.json();
    setOrder(data);
    console.log(order);
        }
    fetchOrderDetails();
    }, [params.id]);

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-semibold">Rendelés szerkesztése</h2>
                <form>
                    <button className="rounded-md bg-blue-500 text-white p-2 mr-2">Rögzítés</button>
                    <Link href={`/orders/${params.id}`} className="rounded-md bg-gray-500 text-white p-2">Vissza</Link>
                </form>
            </section>
        </main>
    )
}