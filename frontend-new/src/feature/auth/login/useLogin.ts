"use client";

import { setToken } from "@/lib/auth";
import { ApiError } from "@/lib/error";
import { routes } from "@/lib/routes";
import { RemoteAuthRepository } from "@/repository/auth/RemoteAuthRepository";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginFormSchema } from "./login-form-schema";

export const useLogin = () => {
  const router = useRouter();

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

        if (response?.token) {
          setToken(response.token);
          router.push(routes.orders);
        }
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 401) {
            toast.error("Hibás email vagy jelszó.");
            return;
          }
          if (error.status >= 500) {
            toast.error("Szerverhiba. Próbáld újra később.");
            return;
          }
        }

        console.error("Váratlan bejelentezési hiba:", error);
        toast.error("Nem sikerült bejelentkezni.");
      }
    },
  });
  return { form };
};
