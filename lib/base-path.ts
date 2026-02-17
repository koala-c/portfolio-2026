const NEXT_PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${NEXT_PUBLIC_BASE_PATH}${normalizedPath}`;
}
