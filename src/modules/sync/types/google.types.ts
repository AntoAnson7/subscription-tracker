export interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  error?: string;
  error_description?: string;
}

export interface GoogleTokenClient {
  requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
}

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name?: string;
  given_name?: string;
  picture?: string;
}

export interface GmailMessageHeader {
  name: string;
  value: string;
}

export interface GmailMessagePart {
  mimeType?: string;
  body?: {
    size: number;
    data?: string;
  };
  parts?: GmailMessagePart[];
  headers?: GmailMessageHeader[];
}

export interface GmailMessageDetails {
  id: string;
  threadId: string;
  snippet: string;
  internalDate: string;
  payload?: GmailMessagePart;
}

export interface GmailListResponse {
  messages?: Array<{ id: string; threadId: string }>;
  nextPageToken?: string;
  resultSizeEstimate?: number;
}
