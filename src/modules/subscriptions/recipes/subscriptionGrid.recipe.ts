import { sva } from 'styled-system/css';

export const subscriptionGridStyles = sva({
  slots: ['root', 'emptyState', 'emptyTitle', 'emptySubtitle'],
  base: {
    root: {
      display: 'grid',
      gridTemplateColumns: {
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      },
      gap: '250',
    },
    emptyState: {
      gridColumn: '1 / -1',
      p: '500',
      textAlign: 'center',
      borderRadius: '2xl',
      border: '1px dashed',
      borderColor: 'border.default',
      background: 'bg.muted',
    },
    emptyTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: 'text.primary',
      mb: '100',
    },
    emptySubtitle: {
      fontSize: '14px',
      color: 'text.secondary',
    },
  },
});
