import { ApiError, NetworkError } from "@/lib/error";

export function getErrorMessage(error: unknown): string {
  if (error instanceof NetworkError) {
    return error.message;
  }

  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return "A kérés hibás vagy érvénytelen adatokat tartalmaz.";
      case 403:
        return "Nincs jogosultságod a művelethez.";
      case 404:
        return "A keresett erőforrás nem található.";
      case 409:
        return "A művelet ütközik a jelenlegi adatokkal.";
      default:
        if (error.status >= 500) {
          return "Szerverhiba történt. Próbáld újra később.";
        }
    }
  }

  return "Váratlan hiba történt.";
}
