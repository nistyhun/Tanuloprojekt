import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
    }
  }, [router]);

  return getToken;
}
