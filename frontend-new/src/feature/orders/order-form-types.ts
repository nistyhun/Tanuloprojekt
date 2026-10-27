import { z } from "zod";
import { orderFormSchema } from "./order-form-schema";

export type OrderFormValues = z.infer<typeof orderFormSchema>;
