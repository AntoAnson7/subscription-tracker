import { useRef } from 'react';
import { X } from 'lucide-react';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { useFocusTrap } from '@/modules/common/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/modules/common/hooks/useLockBodyScroll';
import { LegalContentSection } from '@/modules/legal/components/LegalContentSection';
import { ALL_LEGAL_DOCUMENTS, getLegalDocument } from '@/modules/legal/constants/legalDocuments';
import { legalModalStyles } from '@/modules/legal/recipes/legalModal.recipe';
import { LegalTab } from '@/modules/legal/types/legal.types';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onTabChange: (tab: LegalTab) => void;
  onClose: () => void;
}

export function LegalModal({ isOpen, activeTab, onTabChange, onClose }: LegalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const classes = legalModalStyles();
  const doc = getLegalDocument(activeTab);

  useClickOutside(modalRef, onClose, isOpen);
  useFocusTrap(modalRef, isOpen, { onEscape: onClose });
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <div
      className={classes.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div ref={modalRef} className={classes.modal}>
        <button
          type="button"
          onClick={onClose}
          className={classes.closeBtn}
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        <header className={classes.header}>
          <h2 id="legal-modal-title" className={classes.title}>
            {doc.title}
          </h2>

          <nav className={classes.tabBar} aria-label="Legal document tabs">
            {ALL_LEGAL_DOCUMENTS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={classes.tabBtn}
                data-active={item.id === activeTab}
                onClick={() => onTabChange(item.id)}
              >
                {item.tabLabel}
              </button>
            ))}
          </nav>
        </header>

        <div className={classes.body}>
          {doc.sections.map((section) => (
            <LegalContentSection key={section.heading} section={section} />
          ))}

          <div className={classes.footerNote}>
            Effective & Last Updated: {doc.lastUpdated} • SubTrack Application
          </div>
        </div>
      </div>
    </div>
  );
}
