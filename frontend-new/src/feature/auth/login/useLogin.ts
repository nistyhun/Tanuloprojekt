"use client";

import { getToken, setToken } from "@/lib/auth";
import { ApiError } from "@/lib/error";
import { getErrorMessage } from "@/lib/get-error-message";
import { routes } from "@/lib/routes";
import { RemoteAuthRepository } from "@/repository/auth/RemoteAuthRepository";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { loginFormSchema } from "./login-form-schema";

export const useLogin = () => {
  const router = useRouter();

  useEffect(() => {
    if (getToken()) {
      router.replace(routes.orders);
    }
  }, [router]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await new RemoteAuthRepository().login(value);

        if (!response?.token) {
          toast.error("A bejelentkezési válasz nem tartalmaz tokent.");
          return;
        }

        setToken(response.token);
        router.push(routes.orders);
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 401) {
            toast.error("Hibás email vagy jelszó.");
            return;
          }
        }

        console.error("Bejelentezési hiba:", error);
        toast.error(getErrorMessage(error));
      }
    },
  });
  return { form };
};
