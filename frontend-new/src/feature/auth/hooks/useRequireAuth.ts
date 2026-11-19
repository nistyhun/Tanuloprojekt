import { routes } from "@/lib/routes";
import { RemoteAuthRepository } from "@/repository/auth/RemoteAuthRepository";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        await new RemoteAuthRepository().getCurrentUser();
      } catch {
        if (!cancelled) {
          router.replace(routes.login);
        }
      }
    }

    void checkAuth();

    return () => {
      cancelled = true;
    };
  }, [router]);
}
