export type Order = {
  id: number;
  category: {
    id: number;
    type: string;
  };
  customerName: string;
  deadline: string;
  quantity: number;
  publisherName: string;
};
