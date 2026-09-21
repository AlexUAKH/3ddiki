export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  email: string;
  expire_at: number;
  id: string;
  user: User;
}

export type User = {
  id: string;
  email: string;
  role: EUserRoles;
  isEmailVerified: boolean;
};

export type UserInfo = User & {
  name: string;
  lastName: string;
  stripeCustomerId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export enum EUserRoles {
  ADMIN = "admin",
  USER = "user",
}
