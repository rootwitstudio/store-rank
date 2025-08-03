import { 
  Shirt, 
  Monitor, 
  Utensils, 
  Sofa, 
  BookOpen, 
  Heart, 
  Store, 
  Sparkles, 
  Dumbbell, 
  Gamepad2, 
  Car,
  Star,
  TrendingUp,
  Plus,
  Shield,
  Users
} from "lucide-react";

// Icon mapping based on category slugs from the seed data
export const categoryIconMap: Record<string, React.ElementType> = {
  // Main categories
  'fashion': Shirt,
  'electronics': Monitor,
  'home-living': Sofa,
  'food-beverages': Utensils,
  'books': BookOpen,
  'beauty-personal-care': Sparkles,
  'sports-outdoors': Dumbbell,
  'toys-games': Gamepad2,
  'health-wellness': Heart,
  'automotive': Car,
  
  // Subcategories - Men's Clothing
  'mens-clothing': Shirt,
  
  // Subcategories - Women's Clothing
  'womens-clothing': Shirt,
  
  // Subcategories - Kids' Clothing
  'kids-clothing': Shirt,
  
  // Subcategories - Shoes
  'shoes': Shirt,
  
  // Subcategories - Accessories
  'accessories': Shirt,
  
  // Subcategories - Electronics
  'smartphones': Monitor,
  'computers': Monitor,
  'audio': Monitor,
  'gaming': Gamepad2,
  
  // Subcategories - Home & Living
  'furniture': Sofa,
  'decor': Sofa,
  'kitchen': Utensils,
  'bedding': Sofa,
  
  // Subcategories - Food & Beverages
  'groceries': Utensils,
  'beverages': Utensils,
  'snacks': Utensils,
  
  // Subcategories - Books
  'fiction': BookOpen,
  'non-fiction': BookOpen,
  'textbooks': BookOpen,
  
  // Subcategories - Beauty & Personal Care
  'skincare': Sparkles,
  'makeup': Sparkles,
  'hair-care': Sparkles,
  
  // Subcategories - Sports & Outdoors
  'fitness': Dumbbell,
  'outdoor-sports': Dumbbell,
  'team-sports': Dumbbell,
  
  // Subcategories - Toys & Games
  'board-games': Gamepad2,
  'toys': Gamepad2,
  'video-games': Gamepad2,
  
  // Subcategories - Health & Wellness
  'supplements': Heart,
  'medical-supplies': Heart,
  'fitness-trackers': Heart,
  
  // Subcategories - Automotive
  'car-parts': Car,
  'tools': Car,
  
  // Custom categories
  'star': Star,
  'trendingup': TrendingUp,
  'plus': Plus,
  'shield': Shield,
  'users': Users,
  
  // Default fallback
  'default': Store,
};

/**
 * Get the appropriate icon component for a category based on its slug
 * @param slug - The category slug
 * @returns The icon component or Store as fallback
 */
export function getCategoryIcon(slug: string): React.ElementType {
  return categoryIconMap[slug] || categoryIconMap.default;
}

/**
 * Get the appropriate icon component for a category based on its name
 * This is useful when you have the category name but not the slug
 * @param name - The category name
 * @returns The icon component or Store as fallback
 */
export function getCategoryIconByName(name: string): React.ElementType {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return getCategoryIcon(slug);
}
