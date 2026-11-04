export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  email: string;
  expire_at: number;
  id: string;
  user: AuthUser;
}

export type AuthUser = {
  id: string;
  email: string;
  role: EUserRoles;
  isEmailVerified: boolean;
  permissions?: any[];
};

export type UserInfo = AuthUser & {
  name: string;
  lastName: string;
  stripeCustomerId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export enum EUserRoles {
  ADMIN = "admin",
  USER = "user",
  MANAGER = "manager",
}
