type OrderFormValues = {
  customerName: string;
  publisherName: string;
  categoryId: number;
  deadline: string;
  quantity: number;
};

export function validateOrder(values: OrderFormValues) {
  const errors = {
    customerName: "",
    publisherName: "",
    categoryId: "",
    deadline: "",
    quantity: "",
  };

  if (values.customerName.trim() === "") {
    errors.customerName = "A megrendelő megadása kötelező.";
  }

  if (values.publisherName.trim() === "") {
    errors.publisherName = "A kiadó megadása kötelező";
  }

  if (values.categoryId === 0) {
    errors.categoryId = "Válassz kategóriát.";
  }

  if (values.deadline === "") {
    errors.deadline = "A határidő megadása kötelező";
  }

  if (values.quantity < 1) {
    errors.quantity = "A mennyiség legalább 1 legyen";
  }

  return errors;
}
