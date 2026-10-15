import { API_BASE_URL } from "@/api/api-config";
import { deleteToken, getToken } from "@/lib/auth";
import { ApiError, UnauthorizedError } from "@/lib/error";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function request<TResponse>(
  endpoint: string,
  method: HttpMethod,
  body?: unknown,
  requiresAuth = true,
): Promise<TResponse> {
  const token = requiresAuth ? getToken() : null;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (response.status === 401 && requiresAuth) {
    deleteToken();
    throw new UnauthorizedError();
  }

  if (!response.ok) {
    throw new ApiError(response.status, `HTTP hiba: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json() as Promise<TResponse>;
  }

  if (contentType?.startsWith("text/")) {
    return response.text() as Promise<TResponse>;
  }

  return undefined as TResponse;
}

export const apiClient = {
  get: <TResponse>(endpoint: string) => request<TResponse>(endpoint, "GET"),

  post: <TResponse, TBody>(
    endpoint: string,
    body: TBody,
    requiresAuth = true,
  ) => request<TResponse>(endpoint, "POST", body, requiresAuth),

  put: <TResponse, TBody>(endpoint: string, body: TBody) =>
    request<TResponse>(endpoint, "PUT", body),

  patch: <TResponse, TBody>(endpoint: string, body: TBody) =>
    request<TResponse>(endpoint, "PATCH", body),

  delete: <TResponse = void>(endpoint: string) =>
    request<TResponse>(endpoint, "DELETE"),
};
