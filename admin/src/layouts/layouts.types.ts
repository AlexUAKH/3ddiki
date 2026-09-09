export enum EAppLayouts {
  default = "default",
  auth = "auth",
}

export const AppLayoutToFileMap: Record<EAppLayouts, string> = {
  default: "DefaultLayout.vue",
  auth: "AuthLayout.vue",
};
