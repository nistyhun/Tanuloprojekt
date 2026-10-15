"use client";

import { Button } from "@/components/ui/button";
import { FormFieldError } from "@/components/ui/form-field-error";
import { Label } from "@/components/ui/label";
import { TextInput } from "../../../components/ui/textInput";
import { useLogin } from "./useLogin";

export const Login = () => {
  const { form } = useLogin();

  return (
    <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 className="text-2xl font-bold mb-2">Bejelentkezés</h1>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => (
            <div className="flex flex-col gap-1">
              <Label htmlFor={field.name}>Email cím</Label>

              <TextInput
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="pelda@pelda.hu"
                aria-invalid={field.state.meta.errors.length > 0}
              />

              <FormFieldError errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <div className="flex flex-col gap-1">
              <Label htmlFor={field.name}>Jelszó</Label>

              <TextInput
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="jelszó"
                aria-invalid={field.state.meta.errors.length > 0}
              />

              <FormFieldError errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Bejelentkezés..." : "Bejelentkezés"}
            </Button>
          )}
        </form.Subscribe>
        <Button variant="primaryAlt" type="button">
          Elfelejtett jelszó
        </Button>
      </form>
    </section>
  );
};
