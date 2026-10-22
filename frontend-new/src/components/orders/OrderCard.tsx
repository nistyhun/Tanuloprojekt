import type { Order } from "@/app/types/order";
import { routes } from "@/lib/routes";
import Link from "next/link";

type OrderCardProps = {
  order: Order;
};

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <article className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">{order.customerName}</h2>

      <p className="text-sm text-gray-600">Kiadó: {order.publisherName}</p>

      <p className="text-sm">Határidő: {order.deadline}</p>
      <p className="text-sm">Mennyiség: {order.quantity} db</p>

      <p className="text-sm">
        Részletek:{" "}
        <Link
          className="text-blue-500"
          href={routes.orderDetails(String(order.id))}
        >
          Link
        </Link>
      </p>
    </article>
  );
};
