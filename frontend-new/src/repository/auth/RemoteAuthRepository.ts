import { apiClient } from "@/api/api-client";
import { endpoints } from "@/api/endpoints";
import { AuthRepository } from "./AuthRepository";
import { Credentials } from "./dto/credentials";
import { TokenDto } from "./dto/token";

export class RemoteAuthRepository implements AuthRepository {
  async login(credentials: Credentials): Promise<TokenDto | undefined> {
    return apiClient.post<TokenDto, Credentials>(
      endpoints.auth.login,
      credentials,
      false,
    );
  }
}
