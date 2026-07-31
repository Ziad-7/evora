import type { CSSProperties } from "react";

/**
 * Solid hex → backgroundColor.
 * Paired "color1|color2" → diagonal split gradient (same visual weight as solid swatches).
 */
export function getColorSwatchStyle(color: string): CSSProperties {
  if (color.includes("|")) {
    const [c1, c2] = color.split("|").map((s) => s.trim());
    if (c1 && c2) {
      return {
        backgroundImage: `linear-gradient(to bottom right, ${c1} 50%, ${c2} 50%)`,
      };
    }
  }
  return { backgroundColor: color };
}
