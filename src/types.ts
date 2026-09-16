export type AICategory =
  | 'all'
  | 'ai-chat'
  | 'ai-writing'
  | 'writing'
  | 'ai-image'
  | 'ai-video'
  | 'ai-voice'
  | 'coding'
  | 'ai-agents'
  | 'productivity'
  | 'design'
  | 'design-3d'
  | 'research-education'
  | 'marketing-sales';

export interface CategoryInfo {
  id: AICategory;
  label: string;
  description: string;
  iconName: string;
  count?: number;
}

export interface AITool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: AICategory;
  categoryLabel: string;
  rating: number;
  reviewCount: number;
  pricing: 'Pro' | 'Plus' | 'Premium' | 'Unlimited' | 'Free Tier';
  originalPrice: string;
  accessStatus: 'locked' | 'unlocked';
  tags: string[];
  features: string[];
  useCases: string[];
  company: string;
  version: string;
  releaseYear: string;
  unlockDuration: string;
  badge?: 'Trending' | 'Popular' | 'Featured' | "Editor's Choice" | 'New';
  gradient: string;
  iconType: string;
  stats: {
    users: string;
    speed: string;
    accuracy: string;
  };
}

export type ViewMode = 'grid' | 'list';

export type SortOption = 'popular' | 'rating' | 'name' | 'newest';

export interface RouteState {
  path: string;
  params?: Record<string, string>;
}
