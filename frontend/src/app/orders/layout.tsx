import Header from "@/app/components/Header";
import { UserProvider } from "@/app/context/UserContext";

export default function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <Header />
      {children}
    </UserProvider>
  );
}
