export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface LoginResponseDto {
  user: UserDto;
}
