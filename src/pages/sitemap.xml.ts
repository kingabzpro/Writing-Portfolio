import type { APIRoute } from "astro";
import { SITE } from "../lib/seo";
import { listPageSlugs } from "../lib/page-content";

function toUrl(pathname: string): string {
  return new URL(pathname, SITE.url).toString();
}

export const GET: APIRoute = async () => {
  const slugs = await listPageSlugs();
  const urls = ["/", ...slugs.map((slug) => `/pages/${slug}`)];
  const lastModified = new Date().toISOString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url>
  <loc>${toUrl(url)}</loc>
  <lastmod>${lastModified}</lastmod>
</url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
