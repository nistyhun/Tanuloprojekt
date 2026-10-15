import Header from "@/components/header/Header";
import type { ReactNode } from "react";

export default function OrdersLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
