export type OrderForm = {
  categoryId: number;
  customerName: string;
  deadline: string;
  quantity: number;
  publisherName: string;
};

export type OrderFormErrors = {
  categoryId?: string;
  customerName?: string;
  deadline?: string;
  quantity?: string;
  publisherName?: string;
};
