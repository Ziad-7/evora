/**
 * Resolves `{productId}-{colorName}.png` from `src/assets`.
 */
import { getAssetSrc } from "@/lib/assetPath";

export function getProductColorImageSrc(productId: string, colorName: string): string {
  const filename = `${productId}-${colorName}.png`;
  return getAssetSrc(filename);
}
