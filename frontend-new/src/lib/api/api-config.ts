const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiBaseUrl) {
  throw new Error("Hiányzik a NEXT_PUBLIC_API_URL.");
}

export const API_BASE_URL = apiBaseUrl;
