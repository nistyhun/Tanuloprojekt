"use client";

import { routes } from "@/lib/routes";
import { RemoteAuthRepository } from "@/repository/auth/RemoteAuthRepository";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();

  async function logout() {
    try {
      await new RemoteAuthRepository().logout();
      router.replace(routes.login);
    } catch (error) {
      console.error("Kijelentkezési hiba:", error);
      toast.error("Nem sikerült kijelentkezni. Próbáld újra.");
    }
  }

  return { logout };
};
