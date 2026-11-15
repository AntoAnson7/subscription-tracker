import { EmailReceipt } from '@/modules/sync/types/sync.types';

export const SIMULATED_EMAIL_RECEIPTS: EmailReceipt[] = [
  {
    id: 'sim-1',
    accountEmail: 'user@example.com',
    subject: 'Your Claude Pro subscription is now active',
    sender: 'Anthropic <billing@anthropic.com>',
    date: '2026-11-14',
    snippet:
      'Thank you for subscribing to Claude Pro. Your monthly membership of $20.00 is confirmed.',
    bodyText:
      'Receipt from Anthropic, PBC. Product: Claude Pro Monthly. Amount paid: $20.00 USD. Next renewal: 2026-12-14. Billing cycle: monthly.',
    messageId: 'msg_anthropic_98231',
  },
  {
    id: 'sim-2',
    accountEmail: 'user@example.com',
    subject: 'Disney+ Hotstar: Subscription order confirmed',
    sender: 'Disney+ Hotstar <subscriptions@hotstar.com>',
    date: '2026-11-13',
    snippet:
      'Welcome to Disney+ Hotstar Super plan. Monthly renewal of ₹149.00 scheduled for 13 Dec 2026.',
    bodyText:
      'Order Confirmation #HS-9021. Plan: Disney+ Hotstar Super. Amount: INR 149.00. Payment method: UPI Autopay. Renewal date: 2026-12-13.',
    messageId: 'msg_hotstar_51120',
  },
  {
    id: 'sim-3',
    accountEmail: 'user@example.com',
    subject: 'HDFC Bank: A/c debited INR 649.00 for NETFLIX',
    sender: 'HDFC Bank Alerts <alerts@hdfcbank.net>',
    date: '2026-11-15',
    snippet:
      'Rs 649.00 debited from A/c **4120 on 15-Nov-26 towards NETFLIX INDIA. UPI Ref 382910.',
    bodyText:
      'Dear Customer, Rs 649.00 has been debited from your account **4120 on 15-Nov-26 towards NETFLIX ENTERTAINMENT SERVICES. Available balance: Rs 48,250.00.',
    messageId: 'msg_hdfc_debit_9941',
  },
  {
    id: 'sim-4',
    accountEmail: 'user@example.com',
    subject: 'Your receipt from Apple for iCloud+ 50GB',
    sender: 'Apple <no_reply@email.apple.com>',
    date: '2026-11-12',
    snippet:
      'Apple Invoice #APL-88219. iCloud+ with 50GB storage: ₹75.00 billed to Mastercard **9011.',
    bodyText:
      'Invoice Date: 12 Nov 2026. Document No: APL-88219. iCloud+ 50 GB monthly storage plan. Subtotal: ₹75.00. Billed to: Mastercard ending in 9011.',
    messageId: 'msg_apple_icloud_7721',
  },
  {
    id: 'sim-5',
    accountEmail: 'user@example.com',
    subject: 'Prime Video: Confirmation of cancellation',
    sender: 'Amazon Prime <auto-confirm@amazon.in>',
    date: '2026-11-14',
    snippet:
      'Your Prime Video subscription cancellation is confirmed. Benefits will end on 30 Nov 2026.',
    bodyText:
      'Hello, as requested, your Prime Video subscription has been cancelled. Your membership benefits will remain active until 30-Nov-2026.',
    messageId: 'msg_amazon_cancel_3321',
  },
];
