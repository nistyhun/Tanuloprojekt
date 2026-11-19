export const endpoints = {
  auth: {
    login: "/auth/login",
  },
  categories: {
    list: "/categories",
  },
  orders: {
    list: "/orders",
    byId: (id: string) => `/orders/${id}`,
  },
} as const;
