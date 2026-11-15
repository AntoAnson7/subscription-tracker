import { useState } from 'react';
import { LegalTab } from '@/modules/legal/types/legal.types';

export function useLegalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<LegalTab>('privacy');

  const openLegal = (tab: LegalTab = 'privacy') => {
    setActiveTab(tab);
    setIsOpen(true);
  };

  const closeLegal = () => {
    setIsOpen(false);
  };

  return {
    isLegalOpen: isOpen,
    activeLegalTab: activeTab,
    openLegal,
    closeLegal,
    setActiveLegalTab: setActiveTab,
  };
}
