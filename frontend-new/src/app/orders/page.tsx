import { Orders } from "@/feature/orders/list/Orders";
import { Suspense } from "react";

export default function OrdersPage() {
  return (
    <Suspense fallback={<p>SUSPENSE FALLBACK AKTÍV</p>}>
      <Orders />
    </Suspense>
  );
}
