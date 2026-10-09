export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function deleteToken() {
  localStorage.removeItem("token");
}
