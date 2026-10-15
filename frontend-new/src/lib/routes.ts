export const routes = {
  login: "/login",
  orders: "/orders",
  orderNew: "/orders/new",
  orderDetails: (id: string) => `/orders/${id}`,
  orderEdit: (id: string) => `/orders/${id}/edit`,
} as const;
