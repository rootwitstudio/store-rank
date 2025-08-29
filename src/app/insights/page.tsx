"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  ArrowLeft,
  TrendingUp,
  ShoppingBag,
  Globe,
  BarChart3,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { BlogPost, BlogCategory } from "@/types/industry-insights";

// Mock data for demonstration - replace with actual API calls
const mockCategories: BlogCategory[] = [
  {
    id: "1",
    name: "E-commerce Trends",
    slug: "ecommerce-trends",
    description: "Latest shopping trends and consumer behavior",
    count: 24,
    color: "bg-blue-100 text-blue-800",
    icon: "TrendingUp",
  },
  {
    id: "2",
    name: "Shopping Guides",
    slug: "shopping-guides",
    description: "How-to guides for smart shopping",
    count: 18,
    color: "bg-green-100 text-green-800",
    icon: "ShoppingBag",
  },
  {
    id: "3",
    name: "Market Analysis",
    slug: "market-analysis",
    description: "Industry reports and market insights",
    count: 15,
    color: "bg-purple-100 text-purple-800",
    icon: "BarChart3",
  },
  {
    id: "4",
    name: "Consumer Insights",
    slug: "consumer-insights",
    description: "Understanding shopper behavior",
    count: 12,
    color: "bg-orange-100 text-orange-800",
    icon: "Users",
  },
  {
    id: "5",
    name: "Tech & Innovation",
    slug: "tech-innovation",
    description: "Latest e-commerce technology",
    count: 9,
    color: "bg-red-100 text-red-800",
    icon: "Zap",
  },
  {
    id: "6",
    name: "Global Markets",
    slug: "global-markets",
    description: "International e-commerce news",
    count: 7,
    color: "bg-indigo-100 text-indigo-800",
    icon: "Globe",
  },
];

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title:
      "The Rise of Social Commerce: How Instagram and TikTok Are Changing Shopping",
    excerpt:
      "Discover how social media platforms are revolutionizing the way we shop online, with live shopping, influencer partnerships, and seamless checkout experiences.",
    content: "Full article content here...",
    category: "ecommerce-trends",
    tags: ["Social Commerce", "Instagram", "TikTok", "Live Shopping"],
    author: "Sarah Chen",
    publishedAt: "2024-01-20",
    updatedAt: "2024-01-20",
    readTime: 8,
    featured: true,
    image: "/images/blog/social-commerce.jpg",
    views: 15420,
    likes: 342,
    comments: 89,
    status: "published",
  },
  {
    id: "2",
    title: "2024 Holiday Shopping Predictions: What Retailers Need to Know",
    excerpt:
      "Expert analysis of upcoming holiday shopping trends, including peak shopping days, popular categories, and consumer spending patterns.",
    content: "Full article content here...",
    category: "market-analysis",
    tags: ["Holiday Shopping", "Predictions", "Retail", "Consumer Behavior"],
    author: "Michael Rodriguez",
    publishedAt: "2024-01-19",
    updatedAt: "2024-01-19",
    readTime: 6,
    featured: true,
    image: "/images/blog/holiday-shopping.jpg",
    views: 12850,
    likes: 298,
    comments: 67,
    status: "published",
  },
  {
    id: "3",
    title: "How to Build Customer Trust in E-commerce: A Complete Guide",
    excerpt:
      "Learn the essential strategies for building customer trust online, from transparent pricing to secure payment methods and excellent customer service.",
    content: "Full article content here...",
    category: "shopping-guides",
    tags: ["Customer Trust", "E-commerce", "Customer Service", "Security"],
    author: "Emily Watson",
    publishedAt: "2024-01-18",
    updatedAt: "2024-01-18",
    readTime: 10,
    featured: false,
    image: "/images/blog/customer-trust.jpg",
    views: 9870,
    likes: 156,
    comments: 43,
    status: "published",
  },
  {
    id: "4",
    title: "Mobile Shopping Revolution: Why Mobile-First Design is Critical",
    excerpt:
      "Explore how mobile devices are dominating e-commerce and why businesses must prioritize mobile-first design strategies.",
    content: "Full article content here...",
    category: "tech-innovation",
    tags: ["Mobile Commerce", "UX Design", "Mobile-First", "E-commerce"],
    author: "David Kim",
    publishedAt: "2024-01-17",
    updatedAt: "2024-01-17",
    readTime: 7,
    featured: false,
    image: "/images/blog/mobile-shopping.jpg",
    views: 11230,
    likes: 234,
    comments: 56,
    status: "published",
  },
  {
    id: "5",
    title: "Sustainable Shopping: How Consumers Are Driving Green E-commerce",
    excerpt:
      "Discover how environmental consciousness is shaping online shopping habits and what retailers are doing to meet these demands.",
    content: "Full article content here...",
    category: "consumer-insights",
    tags: [
      "Sustainability",
      "Green Shopping",
      "Consumer Behavior",
      "Eco-friendly",
    ],
    author: "Lisa Thompson",
    publishedAt: "2024-01-16",
    updatedAt: "2024-01-16",
    readTime: 9,
    featured: false,
    image: "/images/blog/sustainable-shopping.jpg",
    views: 8760,
    likes: 189,
    comments: 34,
    status: "published",
  },
  {
    id: "6",
    title: "Cross-Border E-commerce: Opportunities in International Markets",
    excerpt:
      "Learn about the growing opportunities in cross-border e-commerce and how to successfully expand your business globally.",
    content: "Full article content here...",
    category: "global-markets",
    tags: ["Cross-Border", "International", "Global Expansion", "E-commerce"],
    author: "Alex Johnson",
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-15",
    readTime: 11,
    featured: false,
    image: "/images/blog/cross-border.jpg",
    views: 6540,
    likes: 123,
    comments: 28,
    status: "published",
  },
];

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"publishedAt" | "readTime" | "title">(
    "publishedAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Initialize with mock data
  useEffect(() => {
    const timer = setTimeout(() => {
      setBlogPosts(mockBlogPosts);
      setCategories(mockCategories);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort blog posts
  const filteredAndSortedPosts = blogPosts
    .filter((post) => {
      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "publishedAt":
          comparison =
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime();
          break;
        case "readTime":
          comparison = a.readTime - b.readTime;
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
    setCurrentPage(1);
  };

  const handleSortChange = (
    newSortBy: "publishedAt" | "readTime" | "title"
  ) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const getCategoryInfo = (categorySlug: string) => {
    return categories.find((cat) => cat.slug === categorySlug);
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ElementType> = {
      TrendingUp: TrendingUp,
      ShoppingBag: ShoppingBag,
      BarChart3: BarChart3,
      Users: Users,
      Zap: Zap,
      Globe: Globe,
    };
    return iconMap[iconName] || TrendingUp;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                E-commerce Blog & News
              </h1>
              <p className="text-gray-600 text-lg">
                Stay updated with the latest shopping trends, market insights,
                and e-commerce innovations
              </p>
            </div>
            <Link
              href="/"
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Categories and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                Categories:
              </span>
              <button
                onClick={() => handleCategoryChange("")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === ""
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Sort by:
              </span>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split(
                    "-"
                  ) as ["publishedAt" | "readTime" | "title", "asc" | "desc"];
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="publishedAt-desc">Latest First</option>
                <option value="publishedAt-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="readTime-asc">Quick Reads First</option>
                <option value="readTime-desc">Long Reads First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedPosts.length} of {blogPosts.length}{" "}
            articles
            {selectedCategory &&
              ` in ${
                categories.find((c) => c.slug === selectedCategory)?.name
              }`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-xl p-6 h-80 shadow-sm border border-gray-200"></div>
              </div>
            ))}
          </div>
        ) : filteredAndSortedPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? `No articles match "${searchQuery}". Try adjusting your search terms.`
                : "No articles available in this category yet."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {filteredAndSortedPosts.map((post) => {
                const categoryInfo = getCategoryInfo(post.category);
                const IconComponent = categoryInfo?.icon
                  ? getIconComponent(categoryInfo.icon)
                  : TrendingUp;

                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group overflow-hidden"
                  >
                    {/* Featured Image Placeholder */}
                    <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                      <IconComponent className="h-16 w-16 text-blue-400" />
                    </div>

                    <div className="p-6">
                      {/* Category Badge */}
                      {categoryInfo && (
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}
                          >
                            {categoryInfo.name}
                          </span>
                          {post.featured && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        <Link href={`/insights/${post.id}`}>{post.title}</Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime} min read
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1">👤</span>
                            {post.author}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={isLoading}
                  className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    "Load More Articles"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
