import { RefObject, useEffect, useState } from 'react';

export function useCardMenuPlacement(
  menuRef: RefObject<HTMLDivElement | null>,
  defaultPlacement: 'top' | 'bottom'
) {
  const [isOpen, setIsOpen] = useState(false);
  const [actualPlacement, setActualPlacement] = useState<'top' | 'bottom'>(defaultPlacement);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggle = () => {
    if (!isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (defaultPlacement === 'bottom') {
        setActualPlacement(spaceBelow < 180 && rect.top > 180 ? 'top' : 'bottom');
      } else {
        setActualPlacement(rect.top < 180 && spaceBelow > 180 ? 'bottom' : 'top');
      }
    }
    setIsOpen((prev) => !prev);
  };

  const close = () => setIsOpen(false);

  return {
    isOpen,
    actualPlacement,
    toggle,
    close,
  };
}
