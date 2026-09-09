import { AppLayoutToFileMap, EAppLayouts } from "@/layouts/layouts.types";
import type { RouteLocationNormalized } from "vue-router";

export async function layoutMiddleware(
  route: RouteLocationNormalized
): Promise<void> {
  const { layout } = route.meta;
  const normalizedLayoutName = layout || EAppLayouts.default;
  const fileName = AppLayoutToFileMap[normalizedLayoutName];
  const fileNameWithoutExtension = fileName.split(".vue")[0];

  const component = await import(`../layouts/${fileNameWithoutExtension}.vue`);
  route.meta.layoutComponent = component.default;
}
