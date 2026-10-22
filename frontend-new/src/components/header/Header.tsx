"use client";

import { useLogout } from "@/feature/auth/logout/useLogout";
import { Button } from "../ui/button";

export default function Header() {
  const { logout } = useLogout();

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      <h1 className="text-xl font-semibold">Rendeléskezelő</h1>

      <Button variant="danger" type="button" onClick={logout}>
        Kijelentkezés
      </Button>
    </header>
  );
}
