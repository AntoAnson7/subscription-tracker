import {
  GmailListResponse,
  GmailMessageDetails,
  GmailMessagePart,
} from '@/modules/sync/types/google.types';
import { EmailReceipt } from '@/modules/sync/types/sync.types';

const GMAIL_BASE_URL = 'https://gmail.googleapis.com/gmail/v1/users/me';
const GMAIL_QUERY =
  'subject:(subscription OR renewal OR receipt OR invoice OR "payment received" OR "payment successful" OR debited OR "auto-debit" OR "membership renewed" OR cancelled OR canceled OR "free trial")';

function decodeBase64Url(data: string): string {
  try {
    const base64 = data.replace(/-/g, '+').replace(/_/g, '/');
    const binStr = atob(base64);
    return decodeURIComponent(
      Array.from(binStr)
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return '';
  }
}

function extractBodyText(part?: GmailMessagePart): string {
  if (!part) return '';
  if (part.mimeType === 'text/plain' && part.body?.data) {
    return decodeBase64Url(part.body.data);
  }
  if (part.parts && part.parts.length > 0) {
    for (const subPart of part.parts) {
      const text = extractBodyText(subPart);
      if (text) return text;
    }
  }
  if (part.body?.data) {
    return decodeBase64Url(part.body.data);
  }
  return '';
}

export async function fetchGmailReceipts(
  accessToken: string,
  accountEmail: string
): Promise<EmailReceipt[]> {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const queryUrl = `${GMAIL_BASE_URL}/messages?q=${encodeURIComponent(GMAIL_QUERY)}&maxResults=20`;

  const listRes = await fetch(queryUrl, { headers });
  if (listRes.status === 401) {
    throw new Error('AUTH_EXPIRED');
  }
  if (listRes.status === 403) {
    throw new Error('INSUFFICIENT_SCOPES');
  }
  if (!listRes.ok) {
    throw new Error(`Gmail API error (${listRes.status}): ${listRes.statusText}`);
  }

  const listData = (await listRes.json()) as GmailListResponse;
  const messageItems = listData.messages ?? [];
  if (messageItems.length === 0) {
    return [];
  }

  const receipts: EmailReceipt[] = [];

  // Fetch full details for the matching messages in parallel
  const detailPromises = messageItems.slice(0, 15).map(async (item) => {
    try {
      const detailRes = await fetch(`${GMAIL_BASE_URL}/messages/${item.id}?format=full`, {
        headers,
      });
      if (!detailRes.ok) return null;
      return (await detailRes.json()) as GmailMessageDetails;
    } catch {
      return null;
    }
  });

  const detailedMessages = await Promise.all(detailPromises);

  for (const msg of detailedMessages) {
    if (!msg) continue;
    const msgHeaders = msg.payload?.headers ?? [];
    const subject =
      msgHeaders.find((h) => h.name.toLowerCase() === 'subject')?.value ?? 'No Subject';
    const sender =
      msgHeaders.find((h) => h.name.toLowerCase() === 'from')?.value ?? 'Unknown Sender';
    const dateStr = msgHeaders.find((h) => h.name.toLowerCase() === 'date')?.value;
    const date = dateStr ? new Date(dateStr).toISOString() : new Date().toISOString();

    const bodyText = extractBodyText(msg.payload) || msg.snippet || '';

    receipts.push({
      id: msg.id,
      accountEmail,
      subject,
      sender,
      date,
      snippet: msg.snippet ?? '',
      bodyText,
      messageId: msg.id,
    });
  }

  return receipts;
}
