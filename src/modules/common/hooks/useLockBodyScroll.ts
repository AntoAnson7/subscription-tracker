import { useEffect } from 'react';

let lockCount = 0;
let originalOverflow = '';
let originalPaddingRight = '';

export function useLockBodyScroll(isLocked: boolean = true) {
  useEffect(() => {
    if (!isLocked) return;

    if (lockCount === 0) {
      originalOverflow = document.body.style.overflow;
      originalPaddingRight = document.body.style.paddingRight;

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    lockCount++;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        document.documentElement.style.overflow = '';
      }
    };
  }, [isLocked]);
}
