export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const siteRoot = new URL(`${basePath}/`, process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunaco.tech");
export const assetUrl = (name: string) => new URL(name, siteRoot).toString();
