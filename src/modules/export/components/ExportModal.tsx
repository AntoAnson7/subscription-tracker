import { useRef } from 'react';
import { Download, FileSpreadsheet, Printer, X } from 'lucide-react';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { useFocusTrap } from '@/modules/common/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/modules/common/hooks/useLockBodyScroll';
import { exportModalStyles } from '@/modules/export/recipes/exportModal.recipe';
import { exportOptionStyles } from '@/modules/export/recipes/exportOption.recipe';
import { ExportFormat, ExportScope } from '@/modules/export/types/export.types';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  format: ExportFormat;
  scope: ExportScope;
  onFormatChange: (fmt: ExportFormat) => void;
  onScopeChange: (scope: ExportScope) => void;
  onExport: (subscriptions: Subscription[], currency: string) => void;
  subscriptions: Subscription[];
  currency: string;
}

export function ExportModal({
  isOpen,
  onClose,
  format,
  scope,
  onFormatChange,
  onScopeChange,
  onExport,
  subscriptions,
  currency,
}: ExportModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const classes = exportModalStyles();
  const optionClasses = exportOptionStyles();

  useClickOutside(modalRef, onClose, isOpen);
  useFocusTrap(modalRef, isOpen, { onEscape: onClose });
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <div
      className={classes.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <div ref={modalRef} className={classes.modal}>
        <button
          type="button"
          onClick={onClose}
          className={classes.closeBtn}
          aria-label="Close export dialog"
        >
          <X size={16} />
        </button>

        <header className={classes.header}>
          <h2 id="export-modal-title" className={classes.title}>
            Export Subscriptions
          </h2>
          <p className={classes.subtitle}>
            Download a formatted spreadsheet or print-ready tax & reimbursement report.
          </p>
        </header>

        <div className={classes.body}>
          <div className={optionClasses.scopeSelector}>
            <button
              type="button"
              data-active={scope === 'all'}
              onClick={() => onScopeChange('all')}
            >
              All ({subscriptions.length})
            </button>
            <button
              type="button"
              data-active={scope === 'active'}
              onClick={() => onScopeChange('active')}
            >
              Active
            </button>
            <button
              type="button"
              data-active={scope === 'family'}
              onClick={() => onScopeChange('family')}
            >
              Family
            </button>
          </div>

          <div className={optionClasses.optionsGrid}>
            <button
              type="button"
              className={optionClasses.optionCard}
              data-selected={format === 'csv'}
              onClick={() => onFormatChange('csv')}
            >
              <div>
                <FileSpreadsheet size={16} />
                <span>CSV File</span>
              </div>
              <p>Full spreadsheet for Excel, Google Sheets, or budgeting tools.</p>
            </button>

            <button
              type="button"
              className={optionClasses.optionCard}
              data-selected={format === 'print'}
              onClick={() => onFormatChange('print')}
            >
              <div>
                <Printer size={16} />
                <span>Print / PDF</span>
              </div>
              <p>Clean expense summary for tax deductions or workplace reimbursement.</p>
            </button>
          </div>
        </div>

        <div className={classes.actionsRow}>
          <button type="button" onClick={onClose} className={classes.cancelBtn}>
            Cancel
          </button>
          <button
            type="button"
            className={classes.primaryBtn}
            onClick={() => onExport(subscriptions, currency)}
          >
            <Download size={14} />
            <span>{format === 'csv' ? 'Download CSV' : 'Print Report'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
