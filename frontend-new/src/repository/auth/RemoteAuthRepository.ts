import { AuthRepository } from "./AuthRepository";
import { Credentials } from "./dto/credentials";
import { TokenDto } from "./dto/token";

export class RemoteAuthRepository implements AuthRepository {
  login(credentials: Credentials): TokenDto | undefined {
    return {
      accessToken: "frf",
    };
  }
}
