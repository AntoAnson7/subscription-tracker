# Security & Architecture Overview

_Last updated: November 15, 2026_

Subwise is engineered from the ground up around data isolation, minimal privilege, and zero email retention.

---

## 1. Zero-Retention Architecture

- **Client-Side Execution**: When scanning for receipts, email headers and snippets are fetched directly via Google’s encrypted REST API into your active browser session.
- **Local Parsing**: Receipt pattern matching and amount extraction execute entirely in memory on your device.
- **Immediate Discard**: Raw email content is discarded immediately once subscription metrics are extracted.

## 2. Token Security & Lifecycle

- OAuth tokens are maintained in authenticated client storage with short expiration lifespans.
- When you unlink an email account, the OAuth access token is immediately purged from memory and storage.
- No long-term offline refresh tokens are stored on unverified servers.

## 3. Encrypted Communications

All data in transit between your browser, Google Cloud APIs, and Supabase is encrypted with modern Transport Layer Security (TLS 1.3) using industry standard AES-256 ciphers.

## 4. Reporting Security Inquiries

If you discover any security vulnerabilities or have technical questions regarding our data architecture, please report them to `security@subwise.app` or `antoanson6@gmail.com`.
