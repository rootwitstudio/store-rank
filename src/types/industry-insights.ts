export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  featured: boolean;
  image?: string;
  views?: number;
  likes?: number;
  comments?: number;
  status: "published" | "draft" | "archived";
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count: number;
  color?: string;
  icon?: string;
}

// Keep the old interface for backward compatibility
export interface IndustryInsight {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: string;
  trend: string;
  trendColor: string;
  category: string;
  content: string;
  readTime: number;
  featured: boolean;
  tags?: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author?: string;
  views?: number;
  likes?: number;
}

export interface IndustryInsightCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count: number;
}
