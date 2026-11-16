# Privacy Policy

_Last updated: November 15, 2026_

Subwise ("we", "our", or "us") values your privacy above all else. This Privacy Policy describes how we collect, handle, and protect your information when using the Subwise application.

---

## 1. Overview & Commitment

Subwise is built on a **zero-retention privacy architecture**. We only access the minimal data strictly necessary to provide recurring subscription tracking, run-rate analytics, and renewal reminders. We never monetize, sell, or rent your personal information.

## 2. Google User Data & Gmail API Access

When you choose to link a Gmail account, Subwise requests read-only access under the following scopes:

- `https://www.googleapis.com/auth/gmail.readonly`
- `https://www.googleapis.com/auth/userinfo.email`

### Purpose of Access

We query your Gmail inbox solely to locate transactional receipts, billing invoices, payment debit confirmations, and subscription renewal alerts from software and subscription providers (e.g., Netflix, Spotify, AWS, GitHub, Google Workspace).

### Targeted Searching

Subwise uses targeted keyword queries (`from:`, `subject:receipt|invoice|renewal`). We never access, read, or search your personal conversations or private messages.

## 3. Google API Services Limited Use Disclosure

> **Mandatory Google Policy Disclosure**:
> Subwise’s use and transfer to any other app of information received from Google APIs will adhere to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.

- **No Advertising**: Google user data is never used or transferred to serve personalized, re-targeted, or interest-based advertisements.
- **No Generalized AI Training**: Google user data is strictly prohibited from being used to train generalized artificial intelligence or machine learning models.
- **No Human Access**: No human employees or contractors are permitted to read your email messages unless you provide explicit affirmative agreement for specific messages, or as strictly required by law or security investigations.
- **No Third-Party Transfer**: We do not sell or transfer your email data to third parties.

## 4. Data Storage & Zero Email Retention

Subwise **never permanently stores** the contents or bodies of your emails on external databases. Receipt parsing runs client-side directly within your authenticated browser session.

Only the extracted subscription metadata (merchant name, renewal date, subscription cost, currency) is saved to your private account to populate your dashboard and monthly renewal calendar.

## 5. Account Unlinking & Data Revocation

You retain total control over your connected accounts:

- You can unlink your Gmail account with one click in Subwise Profile Settings at any time, which immediately deletes the stored OAuth access token.
- You can also revoke access at any time directly through [Google Security Permissions](https://myaccount.google.com/permissions).

## 6. Contact Information

If you have questions about this Privacy Policy or wish to request complete deletion of your account and metadata, please contact us at `support@subwise.app` or `antoanson6@gmail.com`.
