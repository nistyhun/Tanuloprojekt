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
              }) => {
                return (
                  <OrderForm
                    title="Rendelés szerkesztése"
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
                      categoryId:
                        fieldMeta.categoryId?.errors[0]?.message ?? "",
                      deadline: fieldMeta.deadline?.errors[0]?.message ?? "",
                      quantity: fieldMeta.quantity?.errors[0]?.message ?? "",
                    }}
                  />
                );
              }}
            </form.Subscribe>
            {submitError && (
              <p className="text-sm text-red-500">{submitError}</p>
            )}
            <div className="mt-2">
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
