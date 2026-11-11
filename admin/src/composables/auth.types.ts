export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  email: string;
  expire_at: number;
  user: AuthUser;
}

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: EUserRoles;
  isEmailVerified: boolean;
  stripeCustomerId: boolean;
  // permissions?: any[];
};

export type UserInfo = AuthUser & {
  name: string;
  lastName: string;
  stripeCustomerId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export enum EUserRoles {
  ALL = "all",
  ADMIN = "admin",
  USER = "user",
  MANAGER = "manager",
}
