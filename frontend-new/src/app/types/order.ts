export type Order = {
  id: number;
  categoryId: number;
  customerName: string;
  deadline: string;
  publisherName: string;
  quantity: number;
};

export type Category = {
  id: number;
  type: string;
};

export type OrderDetails = {
  id: number;
  category: Category;
  customerName: string;
  deadline: string;
  publisherName: string;
  quantity: number;
};

export type CreateOrder = {
  customerName: string;
  publisherName: string;
  categoryId: number;
  deadline: string;
  quantity: number;
};

export type UpdateOrder = {
  categoryId: number;
  customerName: string;
  deadline: string;
  quantity: number;
  publisherName: string;
};
