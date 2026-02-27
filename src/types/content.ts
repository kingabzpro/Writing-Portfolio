export interface Item {
  title: string;
  icon: string;
  link: string;
  description?: string;
}

export interface SocialItem {
  platform: string;
  icon: string;
  url: string;
}

export interface ContentData {
  expertise: Item[];
  topics: Item[];
  social: SocialItem[];
}

export interface SearchEntry {
  title: string;
  url: string;
  category: string;
  content?: string;
}

export interface LatestEntry {
  title: string;
  url: string;
  date: string;
}

export interface PortfolioPage {
  slug: string;
  title: string;
  description: string;
  html: string;
  rawContent: string;
  url: string;
}
