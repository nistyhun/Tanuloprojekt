import { Credentials } from "./dto/credentials";
import { TokenDto } from "./dto/token";

export interface AuthRepository {
  login: (credentials: Credentials) => TokenDto | undefined;
}
