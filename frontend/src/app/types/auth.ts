export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};
