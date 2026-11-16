import { useState } from 'react';
import { ExportFormat, ExportScope } from '@/modules/export/types/export.types';
import {
  downloadCsvFile,
  generateSubscriptionsCsv,
} from '@/modules/export/utils/csvExporter.utils';
import { printSubscriptionsReport } from '@/modules/export/utils/printReport.utils';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

export function useExport() {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState<ExportFormat>('csv');
  const [scope, setScope] = useState<ExportScope>('all');

  const executeExport = (subscriptions: Subscription[], currency = 'USD') => {
    let filtered = subscriptions;
    if (scope === 'active') {
      filtered = subscriptions.filter((s) => s.status === 'active');
    } else if (scope === 'family') {
      filtered = subscriptions.filter((s) => Boolean(s.isFamily));
    }

    if (format === 'csv') {
      const csv = generateSubscriptionsCsv(filtered, true);
      const dateStr = new Date().toISOString().split('T')[0];
      downloadCsvFile(csv, `subwise-subscriptions-${dateStr}.csv`);
    } else {
      printSubscriptionsReport(filtered, currency);
    }

    setIsOpen(false);
  };

  return {
    isExportOpen: isOpen,
    format,
    scope,
    setFormat,
    setScope,
    openExport: () => setIsOpen(true),
    closeExport: () => setIsOpen(false),
    executeExport,
  };
}
