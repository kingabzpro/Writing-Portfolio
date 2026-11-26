import type { ImageMetadata } from "astro";
import llms from "../assets/images/covers/llms-editorial.webp";
import machineLearning from "../assets/images/covers/machine-learning-editorial.webp";
import mlops from "../assets/images/covers/mlops-editorial.webp";
import { getPageBySlug } from "./page-content";

export const topicCovers = new Map([
  ["machine-learning-operations", mlops],
  ["large-language-models", llms],
  ["machine-learning", machineLearning]
]);

export async function coversForArticles() {
  const categories = await Promise.all(
    Array.from(topicCovers, async ([slug, cover]) => ({
      cover,
      articles: (await getPageBySlug(slug))?.articleLinks ?? []
    }))
  );
  const covers = new Map<string, ImageMetadata>();
  for (const { cover, articles } of categories) {
    for (const { url } of articles) {
      if (!covers.has(url)) covers.set(url, cover);
    }
  }
  return covers;
}
