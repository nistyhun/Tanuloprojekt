"use client";

import OrderForm from "@/components/orders/OrderForm";
import { Button, ButtonLink } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { useEditOrder } from "./useEditOrder";

export const EditOrder = () => {
  const {
    id,
    categories,
    categoriesError,
    orderError,
    submitError,
    isOrderLoading,
    isCategoriesLoading,
    form,
  } = useEditOrder();

  const isLoading = Boolean(id) && (isOrderLoading || isCategoriesLoading);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {isLoading && (
          <>
            {isCategoriesLoading && <p>Kategóriák betöltése...</p>}
            {isOrderLoading && <p>Rendelés betöltése...</p>}
          </>
        )}
        {id && !isLoading && !orderError && !categoriesError && (
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
              title="Rendelés szerkesztése"
              form={form}
              categories={categories}
            />
            {submitError && (
              <p className="text-sm text-red-500">{submitError}</p>
            )}
            <div className="mt-2 flex gap-2">
              <form.Subscribe selector={(state) => state.isSubmitting}>
                {(isSubmitting) => (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                  >
                    {isSubmitting ? "Rögzítés..." : "Rögzítés"}
                  </Button>
                )}
              </form.Subscribe>
              <ButtonLink href={routes.orderDetails(id)} variant="secondary">
                Vissza
              </ButtonLink>
            </div>
          </form>
        )}
        {!id && (
          <p className="text-sm text-red-500">Érvénytelen rendelésazonosító.</p>
        )}
        {orderError && <p className="text-sm text-red-500">{orderError}</p>}
        {categoriesError && (
          <p className="text-sm text-red-500">{categoriesError}</p>
        )}
      </section>
    </main>
  );
};
