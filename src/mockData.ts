import { Post, AdCampaign, ReferralTelemetry } from './types';

export const AUTHORS = {
  alex: {
    name: 'Alex Farma',
    role: 'Editor-in-Chief & AI Strategist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Farma is an AI optimization researcher exploring how next-generation large language models catalog and present information. He runs FarmaOnline to help modern creators rank first in conversational query engines.'
  },
  sarah: {
    name: 'Sarah Chen',
    role: 'Lead Tech Analyst',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Sarah has a decade of experience mapping SEO guidelines and digital ecosystems. She specializes in search visibility audits and conversational search mechanics.'
  }
};

export const MOCK_POSTS: Post[] = [
  {
    id: 'rank-in-chatgpt',
    title: 'The ChatGPT SEO Code: How to Rank Your Services inside conversational AI Engines',
    subtitle: 'Move over Google Search. Conversational engines are driving 40% of affiliate intent. Here is how your blog articles can rank in ChatGPT Search answers today.',
    excerpt: 'Traditional SEO is shifting to LLM Optimization (LLMO). Discover the exact structural guidelines conversational scrapers use, and gain access to the ChatGPT Search Masterclass course to fully automate your site’s ranking.',
    category: 'reviews',
    image: '/src/assets/images/chatgpt_seo_blog_1782107075907.jpg',
    publishDate: '2026-06-20',
    readingTime: '8 min read',
    author: AUTHORS.alex,
    isTrending: true,
    isEditorChoice: true,
    views: 14209,
    likes: 1253,
    tags: ['AI SEO', 'ChatGPT', 'Monetization', 'Conversational Search', 'Course Review'],
    
    // Review/affiliate data
    rating: {
      score: 9.7,
      breakdown: {
        usefulness: 9.8,
        value: 9.5,
        easeOfUse: 9.6,
        performance: 9.9
      }
    },
    pros: [
      'Comprehensive, step-by-step structural guidelines for XML schemas required by ChatGPT custom search.',
      'Explains Google LLM indexing algorithms and Web-Search Grounding API responses.',
      'Includes 12 pre-tested markdown schemas for rapid rich-snippet integration.',
      'Provides a live community of 5,000+ AI practitioners and digital marketers.'
    ],
    cons: [
      'Focuses heavily on ChatGPT Search and Claude Web Crawler, lesser emphasis on Gemini grounding.',
      'Requires basic knowledge of JSON-LD metadata formats.'
    ],
    specifications: [
      { label: 'Course Platform', value: 'Teachable Independent Academy' },
      { label: 'Instructor', value: 'Alex Farma & Digital Authority Labs' },
      { label: 'Duration', value: '14.5 Hours of HD Video Content' },
      { label: 'Practical Labs', value: '12 Live XML and Schema Blueprint Audits' },
      { label: 'Bonuses Included', value: 'Auto-Linking Schema Configurator Plugin' },
      { label: 'Target Audience', value: 'Affiliate Bloggers, Tech Publishers, SaaS Marketers' }
    ],
    featuresCompared: [
      {
        feature: 'Conversational LLM Schema blueprinting',
        thisProduct: 'Included (12 detailed structures)',
        competitorA: 'Partial (Standard HTML only)',
        competitorB: 'None (Generic SEO advice)'
      },
      {
        feature: 'Search Grounding API simulation sandbox',
        thisProduct: 'Yes (Interact with live LLM results)',
        competitorA: 'No',
        competitorB: 'No'
      },
      {
        feature: 'Direct 1-on-1 Author code reviews',
        thisProduct: 'Weekly group audits & direct emails',
        competitorA: 'None',
        competitorB: 'Email support only'
      },
      {
        feature: 'Affiliate Monetization Playbooks',
        thisProduct: 'Yes (Highly converting layouts)',
        competitorA: 'Basic text explanations',
        competitorB: 'Yes'
      }
    ],
    verdict: 'The "ChatGPT Search Optimization Masterclass" is the absolute baseline of modern digital publishing. While standard newsletters tell you to "write helpful content", this course teaches you the precise syntactic scaffolding (JSON-LD, custom breadcrumb injection, and semantic indexing blocks) required to force conversational scrapers to cite your affiliate links as trust recommendations. This is highly recommended for anyone looking to secure futuristic traffic streams.',
    affiliateDisclosure: 'Disclosure: When you enroll in the ChatGPT SEO Masterclass through our links, we earn a commission at no additional cost to you. This funds our testing of complex conversational mechanics.',
    affiliateLink: 'https://farmaonline.academy/chatgpt-seo-masterclass',
    affiliateLabel: 'Access ChatGPT Search Masterclass (25% Discount Code: FARMAONLINE)',
    
    faqs: [
      {
        question: 'Does this template work for standard blogs like WordPress or Webflow?',
        answer: 'Yes! The course contains complete platform-specific copy-paste modules for WordPress, Next.js, Hugo, Shopify, and Webflow.'
      },
      {
        question: 'How long until my blog starts getting cited in ChatGPT responses?',
        answer: 'During indexing cycles, standard search results take 3 to 10 days to refresh once indexers fetch your new Google search Grounding APIs. Most students report a 60% hike in citation rates within two weeks.'
      },
      {
        question: 'Is there a refund guarantee?',
        answer: 'Yes, a 30-day money-back ironclad guarantee is issued directly by the Academy.'
      }
    ],
    alternatives: [
      {
        name: 'LLMO Digital Blueprint Course',
        rating: 8.4,
        snippet: 'A shorter alternative focusing purely on JSON-LD structured data for basic search engines. Good, but lacks real-time chatbot grounding workshops.',
        ctaText: 'View On Site',
        link: 'https://farmaonline.academy/llmo-blueprint'
      },
      {
        name: 'Traditional SEO Mastery Bundle',
        rating: 7.9,
        snippet: 'Great for standard Google Keyword searches, but misses conversational prompt matching behaviors. A bit outdated for 2026 standards.',
        ctaText: 'Learn More',
        link: 'https://farmaonline.academy/traditional-seo'
      }
    ]
  },
  {
    id: 'ai-news-gemini3',
    title: 'Gemini 3.5 Live Engine Released: Low Latency Voice & Image Orchestration is Transforming Media',
    subtitle: 'DeepMind launches its most responsive multimodal translation and audio pipeline. We explore the structural mechanics of real-time server-side interactions.',
    excerpt: 'Gemini 3.5 introduces 16kHz microphone captures and 24kHz Little Endian response models. Developers can now stream full visual structures straight to conversational instances.',
    category: 'ai-news',
    image: '/src/assets/images/farmaonline_hero_1782107059262.jpg',
    publishDate: '2026-06-21',
    readingTime: '5 min read',
    author: AUTHORS.alex,
    isTrending: true,
    isPopular: true,
    views: 29482,
    likes: 3840,
    tags: ['Gemini 3.5', 'AI Coding', 'Vocal API', 'Streaming', 'Google Tech']
  },
  {
    id: 'tech-news-custom-chips',
    title: 'Custom Silicon Wars: Why Devs Are Swapping Standard Cloud Instances for Specialized TPU Backends',
    subtitle: 'Standard node servers are bottlenecked by floating-point precision operations. Next-gen TPUs scale floating parameters in milliseconds.',
    excerpt: 'We analyze the raw cost-per-token differentials of TPU v5 versus standard server rigs in full-stack setups. Understand the caching architectures that cut costs by 50%.',
    category: 'tech-news',
    image: '/src/assets/images/ai_tool_review_1782107091456.jpg',
    publishDate: '2026-06-19',
    readingTime: '6 min read',
    author: AUTHORS.sarah,
    isPopular: true,
    views: 18320,
    likes: 1930,
    tags: ['Silicon Design', 'TPU', 'Cloud Infrastructure', 'Token Caching', 'Hosting']
  },
  {
    id: 'review-rankforge-ai',
    title: 'RankForge AI Review (2026): Best Automatic Schema Generator for Generative Search?',
    subtitle: 'We put the industry-backed LLM Schema optimizer through a 10,000-page SEO experiment.',
    excerpt: 'Can automated crawlers really format your site content so that Google, Perplexity, and ChatGPT choose your links above traditional sources? Let’s analyze the telemetry.',
    category: 'reviews',
    image: '/src/assets/images/ai_tool_review_1782107091456.jpg',
    publishDate: '2026-06-15',
    readingTime: '7 min read',
    author: AUTHORS.sarah,
    isEditorChoice: true,
    views: 9340,
    likes: 812,
    tags: ['SaaS Review', 'RankForge', 'Schema Generator', 'SEO Tools', 'Affiliate Marketing'],
    rating: {
      score: 9.1,
      breakdown: {
        usefulness: 9.3,
        value: 8.8,
        easeOfUse: 9.5,
        performance: 8.9
      }
    },
    pros: [
      'Instantly crafts standard and custom schema structures compatible with all main indexing engines.',
      'Monitors real-time conversational mentions of your keywords daily.',
      'Interactive visual dashboard illustrating prompt citation performance.'
    ],
    cons: [
      'Expensive subscription tiered starting at $49/mo.',
      'Slight rate-limit latency during peak hours.'
    ],
    specifications: [
      { label: 'Tool Category', value: 'LLM Schema Automation & Citations Tracking' },
      { label: 'Supported Crawlers', value: 'ChatGPT Search, Claude Bot, Perplexity, Gemini Indexer' },
      { label: 'API Integrations', value: 'WordPress Plugin, REST API, Webhooks' },
      { label: 'Free Trial', value: 'Yes (14 Days, No Credit Card Required)' },
      { label: 'Pricing Premium', value: '$49/month Base, $199/month Pro' }
    ],
    verdict: 'RankForge AI provides a gorgeous, visual solution to one of the most tedious parts of modern content marketing. Instead of hoping AI crawlers parse your tables correctly, it enforces semantic certainty. When coupled with our recommended advanced course, you can completely automate the ranking loop.',
    affiliateDisclosure: 'Disclosure: Sign up through our portal as verified early users of RankForge to claim a 14-day premium trial plus 20% off with code FARMA20.',
    affiliateLink: 'https://rankforge.ai/farmaonline-partner',
    affiliateLabel: 'Secure 14-Day Free Trial & Claim Discount',
    faqs: [
      {
        question: 'Do I need any coding to use RankForge?',
        answer: 'No. They have custom browser extensions and a WordPress plugin that injects appropriate schemas automatically dynamically.'
      }
    ],
    alternatives: [
      {
        name: 'SchemaPro Generator',
        rating: 8.1,
        snippet: 'Excellent standard SEO schema software, but it does not track chatbot citation trends.',
        ctaText: 'Visit SchemaPro',
        link: 'https://farmaonline.academy/schemapro'
      }
    ]
  }
];

export const MOCK_ADS: AdCampaign[] = [
  {
    id: 'top-ad-slot',
    zone: 'header',
    title: '⚡ LIMITED TIME: ChatGPT SEO course is now 25% OFF. Learn the exact hooks conversational bots use to cite your links.',
    sponsorName: 'Farma Learning Academy',
    description: 'Transform traditional text into AI citation structures. Gain verified credentials.',
    ctaText: 'Enroll & Save 25%',
    link: 'https://farmaonline.academy/chatgpt-seo-masterclass'
  },
  {
    id: 'sidebar-ad-slot',
    zone: 'sidebar',
    title: 'RankForge AI: Stop guessing where your organic traffic went.',
    sponsorName: 'RankForge Inc.',
    description: 'Instantly inject LLMO optimization schemas. Monitor Perplexity and ChatGPT citations dynamically with zero code.',
    ctaText: 'Try 14 Days Free',
    link: 'https://rankforge.ai/farmaonline-partner'
  }
];

export const INITIAL_TELEMETRY: ReferralTelemetry[] = [
  { serviceId: 'rank-in-chatgpt', serviceName: 'ChatGPT SEO Masterclass Course', clicks: 231, salesSimulated: 18, commissionEarned: 427.5 },
  { serviceId: 'review-rankforge-ai', serviceName: 'RankForge AI Subscription', clicks: 142, salesSimulated: 8, commissionEarned: 196.0 },
  { serviceId: 'alternative-credits', serviceName: 'Partner Tech Alternative Listings', clicks: 89, salesSimulated: 4, commissionEarned: 40.0 }
];
