import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { PortfolioPage } from "../types/content";

const PAGES_DIR = path.resolve(process.cwd(), "pages");
const BACK_HOME_BUTTON_PATTERN =
  /<a\s+href="\/"\s+class="button\s+back-home-btn">[\s\S]*?<\/a>/gi;
const ARTICLE_LINK_PATTERN = /-\s*\[(.*?)\]\((https?:\/\/[^)\s]+)\)/g;
const PUBLICATION_NAMES: Record<string, string> = {
  analyticsvidhya: "Analytics Vidhya",
  datacamp: "DataCamp",
  firecrawl: "Firecrawl",
  freecodecamp: "freeCodeCamp",
  github: "GitHub",
  google: "Google",
  ibm: "IBM",
  kdnuggets: "KDnuggets",
  linkedin: "LinkedIn",
  medium: "Medium",
  microsoft: "Microsoft",
  nvidia: "NVIDIA",
  olostep: "Olostep",
  openai: "OpenAI",
  statology: "Statology",
  towardsdatascience: "Towards Data Science"
};

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
    .filter(
      (line) =>
        line.length > 0 && !line.startsWith("#") && !line.startsWith("- ") && !line.startsWith("<")
    );
  return lines[0] ?? "Curated writing portfolio content.";
}

function extractPublication(url: string): string {
  try {
    const hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    const parts = hostname.split(".");
    const domain =
      parts.length >= 3 && ["co", "com", "org", "net"].includes(parts.at(-2) ?? "")
        ? parts.at(-3)
        : parts.at(-2) ?? parts[0];

    if (!domain) return "External";
    return PUBLICATION_NAMES[domain] ?? domain.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  } catch {
    return "External";
  }
}

function annotateArticleLinks(content: string): string {
  return content.replace(ARTICLE_LINK_PATTERN, (fullMatch, _title: string, url: string) => {
    const publication = extractPublication(url.trim());
    return `${fullMatch} <span class="publication-tag">${publication}</span>`;
  });
}

function extractArticleLinks(content: string): PortfolioPage["articleLinks"] {
  return Array.from(content.matchAll(ARTICLE_LINK_PATTERN)).map((match) => ({
    title: match[1].trim(),
    url: match[2].trim(),
    publication: extractPublication(match[2].trim())
  }));
}

function stripMarkdown(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFaqs(content: string): PortfolioPage["faqs"] {
  const faqStart = content.search(/^##\s+Frequently Asked Questions\s*$/im);
  if (faqStart === -1) return [];

  const faqContent = content.slice(faqStart);
  const nextSection = faqContent.slice(1).search(/^##\s+/m);
  const section = nextSection === -1 ? faqContent : faqContent.slice(0, nextSection + 1);
  const matches = Array.from(section.matchAll(/^###\s+(.+?)\s*$([\s\S]*?)(?=^###\s+|(?![\s\S]))/gm));

  return matches
    .map((match) => ({
      question: stripMarkdown(match[1]),
      answer: stripMarkdown(match[2])
    }))
    .filter((item) => item.question.length > 0 && item.answer.length > 0);
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
    const rawContent = parsed.content.replace(BACK_HOME_BUTTON_PATTERN, "").trim();
    const fallbackTitle = extractH1(rawContent) ?? formatSlug(slug);
    const title = typeof parsed.data.title === "string" ? parsed.data.title : fallbackTitle;
    const description =
      typeof parsed.data.description === "string"
        ? parsed.data.description
        : extractDescription(rawContent);

    const html = (await marked.parse(annotateArticleLinks(rawContent))) as string;

    return {
      slug,
      title,
      description,
      html,
      rawContent,
      articleLinks: extractArticleLinks(rawContent),
      faqs: extractFaqs(rawContent),
      url: `/pages/${slug}`
    };
  } catch {
    return null;
  }
}
