export const endpoints = {
  auth: {
    login: "/auth/login",
    me: "/auth/me",
    logout: "/auth/logout",
  },
  categories: {
    list: "/categories",
  },
  orders: {
    list: "/orders",
    byId: (id: string) => `/orders/${id}`,
  },
} as const;
