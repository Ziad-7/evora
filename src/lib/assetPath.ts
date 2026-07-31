const assetModules = import.meta.glob("/src/assets/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const assetByFilename = Object.fromEntries(
  Object.entries(assetModules).map(([filePath, resolvedUrl]) => [
    filePath.split("/").pop() ?? "",
    resolvedUrl,
  ]),
);

export function getAssetSrc(filename: string): string {
  return assetByFilename[filename] ?? "";
}
