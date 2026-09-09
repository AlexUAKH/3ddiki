export interface LoginResponse {
  access_token: string;
  email: string;
  expire_at: number;
  id: string;
  permissions: string[];
}

export enum EUserRoles {
  ADMIN = "admin",
  USER = "user",
}
