export interface IUser {
  userId: string;
  name: string;
  email: string;
  role: "ADMIN" | "CUSTOMER" | "RIDER";
  phone?: string;
  address?: string;
  iat?: number;
  exp?: number;
}
