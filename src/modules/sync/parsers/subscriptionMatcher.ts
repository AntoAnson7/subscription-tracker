import { Subscription } from '@/modules/subscriptions/types/subscription.types';

export function matchSubscriptionByMerchant(
  merchantName: string,
  subscriptions: Subscription[]
): Subscription | null {
  const cleanTarget = merchantName.toLowerCase().trim();

  // 1. Direct name match or substring
  for (const sub of subscriptions) {
    const cleanSub = sub.name.toLowerCase().trim();
    if (cleanTarget.includes(cleanSub) || cleanSub.includes(cleanTarget)) {
      return sub;
    }
  }

  // 2. Keyword aliases
  const aliasMap: Record<string, string[]> = {
    netflix: ['netflix entertainment', 'netflix india'],
    'amazon prime': ['prime video', 'amazon', 'prime membership'],
    apple: ['apple.com/bill', 'icloud', 'itunes', 'apple services'],
    openai: ['chatgpt', 'openai'],
    anthropic: ['claude', 'claude pro'],
    hotstar: ['disney', 'disney+ hotstar', 'star india'],
  };

  for (const [key, aliases] of Object.entries(aliasMap)) {
    const isTargetMatch = cleanTarget.includes(key) || aliases.some((a) => cleanTarget.includes(a));
    if (isTargetMatch) {
      const matched = subscriptions.find((sub) => {
        const subName = sub.name.toLowerCase();
        return subName.includes(key) || aliases.some((a) => subName.includes(a));
      });
      if (matched) return matched;
    }
  }

  return null;
}
