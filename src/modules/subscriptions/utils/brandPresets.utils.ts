import { SubscriptionCategory } from '@/modules/subscriptions/types/subscription.types';

export interface BrandPreset {
  name: string;
  category: SubscriptionCategory;
  defaultCost?: number;
  brandColor: string;
  iconSlug: string;
  websiteUrl: string;
  cancellationUrl: string;
}

export const POPULAR_BRANDS: BrandPreset[] = [
  {
    name: 'Netflix',
    category: 'Entertainment',
    defaultCost: 15.49,
    brandColor: '#E50914',
    iconSlug: 'netflix',
    websiteUrl: 'https://netflix.com',
    cancellationUrl: 'https://netflix.com/youraccount',
  },
  {
    name: 'Spotify',
    category: 'Entertainment',
    defaultCost: 10.99,
    brandColor: '#1DB954',
    iconSlug: 'spotify',
    websiteUrl: 'https://spotify.com',
    cancellationUrl: 'https://spotify.com/account/subscription',
  },
  {
    name: 'ChatGPT Plus',
    category: 'Productivity & AI',
    defaultCost: 20.0,
    brandColor: '#10A37F',
    iconSlug: 'openai',
    websiteUrl: 'https://chatgpt.com',
    cancellationUrl: 'https://chatgpt.com/#settings/Account',
  },
  {
    name: 'GitHub Copilot',
    category: 'Developer Tools',
    defaultCost: 10.0,
    brandColor: '#24292E',
    iconSlug: 'github',
    websiteUrl: 'https://github.com',
    cancellationUrl: 'https://github.com/settings/billing',
  },
  {
    name: 'Figma Professional',
    category: 'Design & Craft',
    defaultCost: 15.0,
    brandColor: '#F24E1E',
    iconSlug: 'figma',
    websiteUrl: 'https://figma.com',
    cancellationUrl: 'https://figma.com/settings',
  },
  {
    name: 'Apple One',
    category: 'Bundled Services',
    defaultCost: 19.95,
    brandColor: '#000000',
    iconSlug: 'apple',
    websiteUrl: 'https://apple.com',
    cancellationUrl: 'https://support.apple.com/billing',
  },
  {
    name: 'YouTube Premium',
    category: 'Entertainment',
    defaultCost: 13.99,
    brandColor: '#FF0000',
    iconSlug: 'youtube',
    websiteUrl: 'https://youtube.com',
    cancellationUrl: 'https://youtube.com/paid_memberships',
  },
  {
    name: 'Amazon Prime',
    category: 'Bundled Services',
    defaultCost: 14.99,
    brandColor: '#00A8E1',
    iconSlug: 'amazon',
    websiteUrl: 'https://amazon.com',
    cancellationUrl: 'https://amazon.com/mc/manage',
  },
  {
    name: 'Disney+',
    category: 'Entertainment',
    defaultCost: 13.99,
    brandColor: '#113CCF',
    iconSlug: 'disney',
    websiteUrl: 'https://disneyplus.com',
    cancellationUrl: 'https://disneyplus.com/account',
  },
  {
    name: 'Notion Plus',
    category: 'Productivity & AI',
    defaultCost: 10.0,
    brandColor: '#000000',
    iconSlug: 'notion',
    websiteUrl: 'https://notion.so',
    cancellationUrl: 'https://notion.so/settings',
  },
  {
    name: 'Midjourney',
    category: 'Productivity & AI',
    defaultCost: 30.0,
    brandColor: '#000000',
    iconSlug: 'midjourney',
    websiteUrl: 'https://midjourney.com',
    cancellationUrl: 'https://midjourney.com/account',
  },
  {
    name: 'Vercel Pro',
    category: 'Developer Tools',
    defaultCost: 20.0,
    brandColor: '#000000',
    iconSlug: 'vercel',
    websiteUrl: 'https://vercel.com',
    cancellationUrl: 'https://vercel.com/dashboard/billing',
  },
];

export function findMatchingBrands(query: string): BrandPreset[] {
  if (!query || query.trim().length === 0) return [];
  const clean = query.toLowerCase().trim();
  return POPULAR_BRANDS.filter((b) => b.name.toLowerCase().includes(clean));
}
