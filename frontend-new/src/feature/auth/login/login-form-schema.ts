import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .email("Érvénytelen email cím. ")
    .min(1, "Az email cím megadása kötelező."),

  password: z.string().min(1, "A jelszó megadása kötelező."),
});
