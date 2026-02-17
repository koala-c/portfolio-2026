import "server-only";

export type PortfolioPhoto = {
  src: string;
  alt: string;
  categoryKey: "Landscape" | "Street" | "Architecture" | "Portrait" | "Still Life";
};

type CloudinaryResource = {
  secure_url: string;
  public_id: string;
  tags?: string[];
};

type CloudinaryResponse = {
  resources?: CloudinaryResource[];
};

type CloudinaryNamedImages = {
  heroPortraitUrl?: string;
  logoUrl?: string;
};

const categoryByTag: Record<string, PortfolioPhoto["categoryKey"]> = {
  landscape: "Landscape",
  street: "Street",
  architecture: "Architecture",
  portrait: "Portrait",
  "still-life": "Still Life",
  still_life: "Still Life",
  stilllife: "Still Life",
};

function inferCategory(resource: CloudinaryResource): PortfolioPhoto["categoryKey"] {
  const tags = resource.tags ?? [];
  for (const rawTag of tags) {
    const normalized = rawTag.toLowerCase().trim();
    if (categoryByTag[normalized]) return categoryByTag[normalized];
  }
  return "Landscape";
}

function publicIdToAlt(publicId: string) {
  const name = publicId.split("/").pop() ?? "Portfolio photo";
  return name.replace(/[-_]+/g, " ").trim();
}

async function fetchCloudinaryResourcesByFolder(folder: string): Promise<CloudinaryResource[]> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret || !folder) {
    return [];
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/resources/by_asset_folder?asset_folder=${encodeURIComponent(
    folder
  )}&max_results=200`;
  const basicAuth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as CloudinaryResponse;
    return data.resources ?? [];
  } catch {
    return [];
  }
}

export async function getCloudinaryPhotos(): Promise<PortfolioPhoto[]> {
  const folder = process.env.CLOUDINARY_FOLDER || "portfolio-2026/photography";

  const resources = await fetchCloudinaryResourcesByFolder(folder);
  return resources.map((resource) => ({
    src: resource.secure_url,
    alt: publicIdToAlt(resource.public_id),
    categoryKey: inferCategory(resource),
  }));
}

export async function getCloudinaryNamedImages(): Promise<CloudinaryNamedImages> {
  const folder = process.env.CLOUDINARY_IMAGES_FOLDER || "portfolio-2026/images";
  const resources = await fetchCloudinaryResourcesByFolder(folder);

  const hero = resources.find((resource) => resource.public_id.startsWith("hero-portrait"));
  const logo = resources.find((resource) => resource.public_id.startsWith("logo"));

  return {
    heroPortraitUrl: hero?.secure_url,
    logoUrl: logo?.secure_url,
  };
}
