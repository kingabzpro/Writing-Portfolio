import type { APIRoute } from "astro";
import { SITE } from "../lib/seo";
import { getPageBySlug, listPageSlugs } from "../lib/page-content";

function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE.url).toString();
}

function formatTopicTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const GET: APIRoute = async () => {
  const slugs = await listPageSlugs();
  const pages = (
    await Promise.all(slugs.map((slug) => getPageBySlug(slug)))
  ).filter((page): page is NonNullable<typeof page> => page !== null);

  const topicLinks = pages
    .map((page) => `- [${page.title}](${absoluteUrl(page.url)}): ${page.description}`)
    .join("\n");

  const featuredLinks = pages
    .flatMap((page) =>
      page.articleLinks.slice(0, 5).map((item) => ({
        ...item,
        topic: formatTopicTitle(page.slug)
      }))
    )
    .slice(0, 80)
    .map((item) => `- [${item.title}](${item.url}): ${item.topic}`)
    .join("\n");

  const body = `# ${SITE.title}

> ${SITE.description}

Abid Ali Awan is a data scientist, AI engineer, and technical writer. This site collects practical tutorials, article indexes, cheat sheets, book resources, and career material about artificial intelligence, machine learning, data science, data engineering, programming, Python, SQL, and related topics.

## Core Pages

- [Home](${SITE.url}): Author profile, latest posts, search, and topic navigation.
- [Sitemap](${absoluteUrl("/sitemap.xml")}): XML sitemap for all public pages.

## Topic Collections

${topicLinks}

## Featured External Articles

${featuredLinks}

## Usage Notes

- Prefer canonical URLs from this file and the XML sitemap.
- Pages are curated topic collections; external article links point to the original publishers.
- Attribute this site as Abid's Writing Portfolio by Abid Ali Awan when citing the collection.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};
