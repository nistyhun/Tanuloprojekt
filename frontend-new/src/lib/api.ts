import type {
  Category,
  CreateOrder,
  Order,
  OrderDetails,
  UpdateOrder,
} from "@/app/types/order";
import { deleteToken } from "./auth";
import { UnauthorizedError } from "./error";

export const API_BASE_URL = "http://localhost:8080";

function handleUnauthorized(response: Response) {
  if (response.status === 401) {
    deleteToken();
    throw new UnauthorizedError();
  }
}

export async function getCategories(token: string): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  handleUnauthorized(response);
  if (!response.ok) {
    throw new Error("Nem sikerült lekérni a kategóriákat.");
  }
  return response.json();
}

export async function getOrderById(
  id: string,
  token: string,
): Promise<OrderDetails> {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  handleUnauthorized(response);
  if (!response.ok) {
    throw new Error("Nem sikerült lekérni a rendelést.");
  }

  return response.json();
}

export async function getOrders(token: string): Promise<Order[]> {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  handleUnauthorized(response);
  if (!response.ok) {
    throw new Error("Nem sikerült lekérni a rendeléseket.");
  }
  return response.json();
}

export async function createOrder(order: CreateOrder, token: string) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  handleUnauthorized(response);
  if (!response.ok) {
    throw new Error("A rendelés mentése sikertelen.");
  }
}

export async function updateOrder(
  id: string,
  order: UpdateOrder,
  token: string,
) {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  handleUnauthorized(response);
  if (!response.ok) {
    throw new Error("A rendelés módosítása sikertelen.");
  }
}

export async function deleteOrder(id: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  handleUnauthorized(response);
  if (!response.ok) {
    throw new Error("A rendelés törlése sikertelen.");
  }
}
