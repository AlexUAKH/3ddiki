//user
export const USERS_API = "admin/user";
export const CUSTOMERS_ROLES_API_FOR_SELECT = "user/roles-for-select";
export const SEND_VERIFICATION_EMAIL_API = "user/send-verification-email";

// filament
export const FILAMENT_API = "admin/filament";
export const FILAMENT_BRANDS_API = "admin/filament-brands";
export const FILAMENT_COLORS_API = "admin/filament-colors";
export const FILAMENT_TYPES_API = "admin/filament-types";
export const FILAMENT_BRANDS_API_FOR_SELECT = "/filament-brands/for-select";
export const FILAMENT_COLORS_API_FOR_SELECT = "/filament-colors/for-select";
export const FILAMENT_TYPES_API_FOR_SELECT = "/filament-types/for-select";
export const FILAMENT_API_FOR_SELECT = "/filament/for-select";

// products
export const PRODUCT_CATEGORY_API = "admin/product-category";
export const PRODUCT_CATEGORY_API_FOR_SELECT = "/product-category/for-select";
export const PRODUCT_API = "admin/products";
export const PRODUCT_VARIANT_API = (productId: number) =>
  `admin/products/${productId}/variants`;
export const PRODUCT_VARIANT_EDIT_API = "admin/variants";
export const PRODUCT_VARIANT_IMAGE_API = (variantId: number) =>
  `admin/variants/${variantId}/image`;

// orders
export const ORDER_API = "admin/orders";

//auth
export const AUTH_LOGIN = "/auth/login";
export const AUTH_REFRESH = "/auth/refresh";
export const AUTH_CHANGE_PASSWORD = "/auth/change-password";
export const AUTH_REGISTER = "/auth/register";
export const AUTH_LOGOUT = "/auth/logout";
export const AUTH_FORGOT = "/auth/forgot";
export const AUTH_PROFILE = "/auth/me";
export const AUTH_USER_INFO = "/user/info";
export const AUTH_SEND_VERIFICATION_LINK = "/auth/send-verification-email";
export const AUTH_VERIFY_EMAIL = "/auth/verify-email";
export const AUTH_RESEND_EMAIL = "/auth/resend-verification-email";
