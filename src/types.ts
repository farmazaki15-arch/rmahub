export type Category = 'ai-news' | 'tech-news' | 'reviews';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface ReviewRating {
  score: number; // e.g. 9.4
  breakdown: {
    usefulness: number;
    value: number;
    easeOfUse: number;
    performance: number;
  };
}

export interface SpecificationItem {
  label: string;
  value: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AlternativeItem {
  name: string;
  rating: number;
  snippet: string;
  ctaText: string;
  link: string;
}

export interface Post {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content?: string;
  category: Category;
  image: string;
  publishDate: string;
  readingTime: string; // e.g. '5 min'
  author: Author;
  isTrending?: boolean;
  isEditorChoice?: boolean;
  isPopular?: boolean;
  likes: number;
  views: number;
  shares?: number;
  tags?: string[];
  
  // Monetization fields (specifically reviews / affiliate)
  rating?: ReviewRating;
  pros?: string[];
  cons?: string[];
  specifications?: SpecificationItem[];
  verdict?: string;
  faqs?: FAQItem[];
  affiliateDisclosure?: string;
  affiliateLink?: string;
  affiliateLabel?: string; // e.g. "Get Master Course Discount"
  alternatives?: AlternativeItem[];
  featuresCompared?: {
    feature: string;
    thisProduct: string;
    competitorA: string;
    competitorB: string;
  }[];
}

export interface AdCampaign {
  id: string;
  zone: 'header' | 'sidebar' | 'in-content';
  title: string;
  sponsorName: string;
  description: string;
  imageUrl?: string;
  ctaText: string;
  link: string;
}

export interface ReferralTelemetry {
  serviceId: string;
  serviceName: string;
  clicks: number;
  salesSimulated: number;
  commissionEarned: number;
}
