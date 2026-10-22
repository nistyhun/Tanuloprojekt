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
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <form.Subscribe
              selector={(state) => ({
                customerName: state.values.customerName,
                publisherName: state.values.publisherName,
                categoryId: state.values.categoryId,
                deadline: state.values.deadline,
                quantity: state.values.quantity,
                errors: state.fieldMeta,
              })}
            >
              {({
                customerName,
                publisherName,
                categoryId,
                deadline,
                quantity,
                errors: fieldMeta,
              }) => (
                <OrderForm
                  title="Új rendelés rögzítése"
                  customerName={customerName}
                  onCustomerNameChange={(value) =>
                    form.setFieldValue("customerName", value)
                  }
                  publisherName={publisherName}
                  onPublisherNameChange={(value) =>
                    form.setFieldValue("publisherName", value)
                  }
                  categories={categories}
                  categoryId={categoryId}
                  onCategoryChange={(value) =>
                    form.setFieldValue("categoryId", value)
                  }
                  deadline={deadline}
                  onDeadlineChange={(value) =>
                    form.setFieldValue("deadline", value)
                  }
                  quantity={quantity}
                  onQuantityChange={(value) =>
                    form.setFieldValue("quantity", value)
                  }
                  errors={{
                    customerName:
                      fieldMeta.customerName?.errors[0]?.message ?? "",
                    publisherName:
                      fieldMeta.publisherName?.errors[0]?.message ?? "",
                    categoryId: fieldMeta.categoryId?.errors[0]?.message ?? "",
                    deadline: fieldMeta.deadline?.errors[0]?.message ?? "",
                    quantity: fieldMeta.quantity?.errors[0]?.message ?? "",
                  }}
                ></OrderForm>
              )}
            </form.Subscribe>
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
              <ButtonLink
                type="button"
                variant="secondary"
                href={routes.orders}
              >
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
