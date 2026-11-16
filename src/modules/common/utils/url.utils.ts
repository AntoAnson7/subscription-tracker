/**
 * Sanitizes external URLs to prevent XSS (blocks javascript:, data:, vbscript: schemes).
 * Only http: and https: protocols are permitted.
 */
export function sanitizeUrl(url?: string | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Block dangerous schemes immediately
  if (/^(javascript|data|vbscript):/i.test(trimmed)) {
    return null;
  }

  try {
    const hasProtocol = /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(trimmed);
    const parsed = new URL(hasProtocol ? trimmed : `https://${trimmed}`);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.href;
    }
    return null;
  } catch {
    return null;
  }
}
