import { sva } from 'styled-system/css';

export const subscriptionGridStyles = sva({
  slots: [
    'root',
    'emptyState',
    'emptyTitle',
    'emptySubtitle',
    'cancelledSection',
    'cancelledHeader',
    'cancelledTitle',
    'cancelledBadge',
  ],
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
    cancelledSection: {
      mt: '400',
      pt: '300',
      borderTop: '1px solid',
      borderColor: 'border.subtle',
    },
    cancelledHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '150',
      mb: '250',
    },
    cancelledTitle: {
      fontSize: '17px',
      fontWeight: '600',
      color: 'text.secondary',
    },
    cancelledBadge: {
      fontSize: '12px',
      px: '100',
      py: '50',
      borderRadius: 'pill',
      background: 'bg.hover',
      color: 'text.secondary',
      fontWeight: '600',
    },
  },
});
