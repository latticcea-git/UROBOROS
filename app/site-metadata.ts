const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://latticcea-git.github.io";

function withBasePath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!basePath || normalizedPath === basePath || normalizedPath.startsWith(`${basePath}/`)) return normalizedPath;
  return `${basePath}${normalizedPath}`;
}

export const metadataBase = new URL(`${siteOrigin}${basePath || ""}/`);

export function publicUrl(path: string) {
  return new URL(withBasePath(path), siteOrigin).toString();
}

export function socialImage(path: string, alt: string) {
  return { url: publicUrl(path), alt };
}
