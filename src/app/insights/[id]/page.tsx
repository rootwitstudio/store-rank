"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  User,
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
    content: `Social commerce has emerged as one of the most transformative trends in e-commerce, fundamentally changing how consumers discover, evaluate, and purchase products. This comprehensive guide explores the key drivers behind this revolution and what it means for businesses and consumers alike.

## The Social Commerce Revolution

Social media platforms have evolved far beyond their original purpose of connecting people. Today, they serve as powerful shopping destinations where users can discover products through organic content, influencer recommendations, and targeted advertising.

### Key Trends Driving Social Commerce

1. **Live Shopping Experiences**: Platforms like Instagram Live and TikTok Live Shopping enable real-time product demonstrations and interactive shopping experiences.

2. **Influencer Partnerships**: Content creators have become trusted shopping advisors, with their recommendations driving significant purchase decisions.

3. **Seamless Checkout**: Integrated payment systems eliminate friction between discovery and purchase, reducing cart abandonment rates.

4. **User-Generated Content**: Customer photos and reviews create authentic social proof that traditional advertising cannot match.

## Platform-Specific Strategies

### Instagram Shopping
- Utilize Instagram Stories for product showcases
- Leverage Instagram Reels for engaging product demonstrations
- Implement shopping tags for direct product discovery

### TikTok Commerce
- Create trending, authentic content that showcases products naturally
- Use TikTok's algorithm to reach new audiences
- Implement TikTok Shop for seamless purchasing

### Facebook Marketplace
- Leverage existing social connections for trust building
- Utilize Facebook's targeting capabilities for precise audience reach
- Implement Facebook Pay for secure transactions

## Best Practices for Success

1. **Authenticity First**: Focus on creating genuine, valuable content rather than hard-selling products
2. **Community Building**: Engage with your audience and build relationships beyond transactions
3. **Data-Driven Optimization**: Use platform analytics to understand what content performs best
4. **Cross-Platform Presence**: Maintain consistent branding across multiple social platforms
5. **Mobile-First Design**: Ensure all shopping experiences are optimized for mobile devices

## The Future of Social Commerce

As technology continues to evolve, we can expect to see:
- Augmented reality (AR) try-on experiences
- Voice-activated shopping through smart devices
- AI-powered product recommendations
- Blockchain-based authenticity verification
- Virtual reality (VR) shopping environments

The businesses that successfully adapt to these changes will be well-positioned to capture the growing social commerce market and build stronger relationships with their customers.`,
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

export default function BlogPostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate API call with mock data
        const timer = setTimeout(() => {
          const post = mockBlogPosts.find((p) => p.id === params.id);
          if (post) {
            setBlogPost(post);
          } else {
            setError("Blog post not found");
          }
          setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
        setError("Failed to load blog post");
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchBlogPost();
    }
  }, [params.id]);

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

  const getCategoryInfo = (categorySlug: string) => {
    return mockCategories.find((cat) => cat.slug === categorySlug);
  };

  const handleShare = async () => {
    if (navigator.share && blogPost) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded mb-8 w-1/2"></div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The blog post you're looking for doesn't exist."}
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(blogPost.category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/insights"
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            <button
              onClick={handleShare}
              className="text-gray-600 hover:text-gray-800 flex items-center transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Blog Post Header */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {/* Category Badge */}
              {categoryInfo && (
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 ${categoryInfo.color} rounded-xl flex items-center justify-center`}
                  >
                    {React.createElement(getIconComponent(categoryInfo.icon), {
                      className: "h-6 w-6",
                    })}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${categoryInfo.color}`}
                  >
                    {categoryInfo.name}
                  </span>
                  {blogPost.featured && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {blogPost.title}
              </h1>

              {/* Excerpt */}
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {blogPost.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-gray-200 pt-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {blogPost.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(blogPost.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {blogPost.readTime} min read
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Post Content */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {blogPost.content}
            </div>
          </div>
        </div>

        {/* Related Posts CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want More Insights?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest shopping trends, market insights, and
            e-commerce innovations.
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Explore All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
