import { apiClient } from "@/lib/api/api-client";
import { endpoints } from "@/lib/api/endpoints";
import { AuthRepository } from "./AuthRepository";
import { Credentials } from "./dto/credentials";
import { LoginResponseDto, UserDto } from "./dto/login-response";

export class RemoteAuthRepository implements AuthRepository {
  async login(credentials: Credentials): Promise<LoginResponseDto | undefined> {
    return apiClient.post<LoginResponseDto, Credentials>({
      endpoint: endpoints.auth.login,
      body: credentials,
      requiresAuth: false,
    });
  }

  async getCurrentUser(): Promise<UserDto | undefined> {
    return apiClient.get<UserDto>(endpoints.auth.me);
  }

  async logout(): Promise<void> {
    await apiClient.post<void, undefined>({
      endpoint: endpoints.auth.logout,
      body: undefined,
      requiresAuth: false,
    });
  }
}
