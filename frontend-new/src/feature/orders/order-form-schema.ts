import { z } from "zod";

export const orderFormSchema = z.object({
  customerName: z.string().trim().min(1, "A megrendelő neve kötelező."),
  publisherName: z.string().trim().min(1, "A kiadó neve kötelező."),
  categoryId: z.number().min(1, "Válassz kategóriát."),
  deadline: z.string().min(1, "A határidő megadása kötelező."),
  quantity: z.number().min(1, "A menyiség legalább 1 legyen."),
});
