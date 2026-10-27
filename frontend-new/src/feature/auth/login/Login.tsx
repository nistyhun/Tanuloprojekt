"use client";

import { Button } from "@/components/ui/button";
import { FormTextField } from "@/components/ui/form-text-field";
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
            <FormTextField
              label="Email cím"
              id={field.name}
              name={field.name}
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="pelda@pelda.hu"
              errors={field.state.meta.errors}
            />
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <FormTextField
              label="Jelszó"
              id={field.name}
              name={field.name}
              type="password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Jelszó"
              errors={field.state.meta.errors}
            />
          )}
        </form.Field>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Bejelentkezés..." : "Bejelentkezés"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
};
