"use client";

import { deleteToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  function logout() {
    deleteToken();
    router.replace("/login");
  }

  return { logout };
};
