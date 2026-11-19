import { Credentials } from "./dto/credentials";
import { LoginResponseDto, UserDto } from "./dto/login-response";

export interface AuthRepository {
  login: (credentials: Credentials) => Promise<LoginResponseDto | undefined>;

  getCurrentUser(): Promise<UserDto | undefined>;

  logout(): Promise<void>;
}
