import { useCallback, useState } from 'react';

export function useLandingFaq(defaultOpenId: string = 'how-sync-works') {
  const [openIds, setOpenIds] = useState<string[]>([defaultOpenId]);

  const toggleFaq = useCallback((id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }, []);

  const isOpen = useCallback(
    (id: string) => {
      return openIds.includes(id);
    },
    [openIds]
  );

  return {
    toggleFaq,
    isOpen,
  };
}
