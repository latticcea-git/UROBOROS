export function publicAsset(src: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!src.startsWith("/") || !basePath || src === basePath || src.startsWith(`${basePath}/`)) return src;
  return `${basePath}${src}`;
}
