import { toAnnualCost, toMonthlyCost } from '@/modules/subscriptions/utils/normalization.utils';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

function escapeCsvField(val: string | number | null | undefined): string {
  if (val === null || val === undefined) return '""';
  let str = String(val);
  // Mitigate CSV Formula Injection (OWASP CWE-1236)
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  return `"${str.replace(/"/g, '""')}"`;
}

export function generateSubscriptionsCsv(
  subscriptions: Subscription[],
  includeNotes = true
): string {
  const headers = [
    'Service Name',
    'Category',
    'Status',
    'Billing Cycle',
    'Tracked Cost',
    'Total Cost',
    'Currency',
    'Monthly Equivalent',
    'Annual Equivalent',
    'Plan Type',
    'Split Members',
    'Next Renewal',
    'Start Date',
    'Cancellation URL',
  ];

  if (includeNotes) {
    headers.push('Notes');
  }

  const rows = subscriptions.map((sub) => {
    const monthlyCost = toMonthlyCost(sub.cost, sub.cycle);
    const annualCost = toAnnualCost(sub.cost, sub.cycle);
    const isFamily = sub.isFamily ?? false;
    const splitCount = isFamily && sub.splitCount ? sub.splitCount : 1;
    const totalCost = isFamily && sub.totalCost ? sub.totalCost : sub.cost;

    const row = [
      escapeCsvField(sub.name),
      escapeCsvField(sub.category),
      escapeCsvField(sub.status),
      escapeCsvField(sub.cycle),
      escapeCsvField(sub.cost.toFixed(2)),
      escapeCsvField(totalCost.toFixed(2)),
      escapeCsvField(sub.currency),
      escapeCsvField(monthlyCost.toFixed(2)),
      escapeCsvField(annualCost.toFixed(2)),
      escapeCsvField(isFamily ? `Family (${splitCount} ways)` : 'Personal'),
      escapeCsvField(splitCount),
      escapeCsvField(sub.renewalDate),
      escapeCsvField(sub.startDate),
      escapeCsvField(sub.cancellationUrl ?? ''),
    ];

    if (includeNotes) {
      row.push(escapeCsvField(sub.notes ?? ''));
    }

    return row.join(',');
  });

  return [headers.map((h) => `"${h}"`).join(','), ...rows].join('\r\n');
}

export function downloadCsvFile(csvContent: string, fileName: string): void {
  if (typeof window === 'undefined') return;
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
