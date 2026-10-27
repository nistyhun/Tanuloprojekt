import type { Category } from "@/app/types/order";
import { FormFieldError } from "@/components/ui/form-field-error";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import type { useCreateOrder } from "@/feature/orders/create/useCreateOrder";
import { FormTextField } from "../ui/form-text-field";

type OrderFormApi = ReturnType<typeof useCreateOrder>["form"];

type OrderFormProps = {
  title: string;
  form: OrderFormApi;
  categories: Category[];
};

export default function OrderForm({ title, form, categories }: OrderFormProps) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
      <div className="flex flex-col gap-4">
        <form.Field name="customerName">
          {(field) => (
            <FormTextField
              label="Megrendelő"
              id={field.name}
              name={field.name}
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
            />
          )}
        </form.Field>

        <form.Field name="publisherName">
          {(field) => (
            <FormTextField
              label="Kiadó"
              id={field.name}
              name={field.name}
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
            />
          )}
        </form.Field>

        <form.Field name="categoryId">
          {(field) => (
            <div className="flex flex-col gap-1">
              <Label htmlFor={field.name}>Kategória</Label>
              <Select
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                onBlur={field.handleBlur}
                aria-invalid={field.state.meta.errors.length > 0}
              >
                <option value={0}>Válassz kategóriát</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.type}
                  </option>
                ))}
              </Select>
              <FormFieldError errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        <form.Field name="deadline">
          {(field) => (
            <FormTextField
              label="Határidő"
              id={field.name}
              name={field.name}
              type="date"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
            />
          )}
        </form.Field>

        <form.Field name="quantity">
          {(field) => (
            <FormTextField
              label="Mennyiség"
              id={field.name}
              name={field.name}
              type="number"
              min={1}
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
            />
          )}
        </form.Field>
      </div>
    </div>
  );
}
