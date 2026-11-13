export function getBrandIconUrl(slug: string | null, websiteUrl: string | null): string | null {
  if (slug) {
    return `https://cdn.simpleicons.org/${slug}`;
  }

  if (websiteUrl) {
    try {
      const url = new URL(websiteUrl);
      return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`;
    } catch {
      return null;
    }
  }

  return null;
}
