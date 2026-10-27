"use client";

import OrderForm from "@/components/orders/OrderForm";
import { Button, ButtonLink } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { useCreateOrder } from "./useCreateOrder";

export const CreateOrder = () => {
  const { categories, categoriesError, isLoading, submitError, form } =
    useCreateOrder();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {isLoading && <p>Kategóriák betöltése...</p>}

        {categoriesError && (
          <p className="text-sm text-red-500">{categoriesError}</p>
        )}

        {!categoriesError && !isLoading && (
          <form
            noValidate
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <OrderForm
              title="Új rendelés rögzítése"
              form={form}
              categories={categories}
            />

            <div className="mt-2 flex gap-2">
              <form.Subscribe selector={(state) => state.isSubmitting}>
                {(isSubmitting) => (
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Rögzítés..." : "Rögzítés"}
                  </Button>
                )}
              </form.Subscribe>

              <ButtonLink variant="secondary" href={routes.orders}>
                Vissza
              </ButtonLink>
            </div>

            {submitError && (
              <p className="text-sm text-red-500">{submitError}</p>
            )}
          </form>
        )}

        {categoriesError && (
          <ButtonLink href={routes.orders} type="button" variant="secondary">
            Vissza
          </ButtonLink>
        )}
      </section>
    </main>
  );
};
