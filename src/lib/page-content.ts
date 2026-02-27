import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { PortfolioPage } from "../types/content";

const PAGES_DIR = path.resolve(process.cwd(), "pages");

function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function extractH1(content: string): string | null {
  const match = content.match(/^#\s+(.+?)\s*$/m);
  return match ? match[1].trim() : null;
}

function extractDescription(content: string): string {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#") && !line.startsWith("- "));
  return lines[0] ?? "Curated writing portfolio content.";
}

export async function listPageSlugs(): Promise<string[]> {
  const entries = await fs.readdir(PAGES_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name.replace(/\.md$/, ""))
    .sort();
}

export async function getPageBySlug(slug: string): Promise<PortfolioPage | null> {
  const filePath = path.join(PAGES_DIR, `${slug}.md`);

  try {
    const source = await fs.readFile(filePath, "utf-8");
    const parsed = matter(source);
    const rawContent = parsed.content.trim();
    const fallbackTitle = extractH1(rawContent) ?? formatSlug(slug);
    const title = typeof parsed.data.title === "string" ? parsed.data.title : fallbackTitle;
    const description =
      typeof parsed.data.description === "string"
        ? parsed.data.description
        : extractDescription(rawContent);

    const html = (await marked.parse(rawContent)) as string;

    return {
      slug,
      title,
      description,
      html,
      rawContent,
      url: `/pages/${slug}`
    };
  } catch {
    return null;
  }
}
