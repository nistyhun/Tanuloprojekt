"use client";

import { UnauthorizedError } from "@/lib/error";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useAuthError() {
  const router = useRouter();
  const handleAuthError = useCallback(
    (error: unknown) => {
      if (error instanceof UnauthorizedError) {
        router.replace("/login");
        return true;
      }
      return false;
    },
    [router],
  );
  return handleAuthError;
}
