export const SITE = {
  title: "Abid's Writing Portfolio",
  description:
    "Explore expertly crafted blogs, step-by-step tutorials, quick-reference cheat sheets, immersive projects, detailed book reviews, and career resources focused on data and AI.",
  url: "https://abid.work",
  image: "/assets/images/author.jpg",
  authorName: "Abid Ali Awan",
  socialLinks: [
    "https://www.linkedin.com/in/1abidaliawan",
    "https://github.com/kingabzpro",
    "https://huggingface.co/kingabzpro",
    "https://www.kaggle.com/kingabzpro",
    "https://x.com/1abidaliawan",
    "https://abidaliawan.medium.com"
  ],
  twitterHandle: "1abidaliawan",
  gaId: "G-PRQC1HFQ4G"
} as const;

interface BuildSeoInput {
  title?: string;
  description?: string;
  image?: string;
  pathname?: string;
  site?: URL;
}

export interface SeoPayload {
  title: string;
  description: string;
  canonical: string;
  imageUrl: string;
}

export function buildSeo({
  title,
  description,
  image,
  pathname = "/",
  site
}: BuildSeoInput): SeoPayload {
  const siteUrl = site ?? new URL(SITE.url);
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pathWithSlash = cleanPath === "/" ? cleanPath : cleanPath.replace(/\/$/, "") + "/";
  const canonical = new URL(pathWithSlash, siteUrl).toString();
  const selectedImage = image ?? SITE.image;
  const imageUrl = selectedImage.startsWith("http")
    ? selectedImage
    : new URL(selectedImage, siteUrl).toString();

  return {
    title: title ?? SITE.title,
    description: description ?? SITE.description,
    canonical,
    imageUrl
  };
}
