/** @type {import('next').NextConfig} */
const isGitHubActions =
  process.env.GITHUB_ACTIONS === "true" || process.env.GITHUB_PAGES === "true";
const repoEnv = process.env.GITHUB_REPOSITORY || "";
const repoParts = repoEnv.split("/");
const repo = repoParts.length > 1 ? repoParts[1] : "";
const basePath = isGitHubActions && repo ? "/" + repo : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? "",
    NEXT_PUBLIC_CLOUDINARY_IMAGES_FOLDER:
      process.env.CLOUDINARY_IMAGES_FOLDER ?? "portfolio-2026/images",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
