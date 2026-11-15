import { sva } from 'styled-system/css';

export const subscriptionGridStyles = sva({
  slots: [
    'root',
    'emptyState',
    'emptyTitle',
    'emptySubtitle',
    'cancelledSection',
    'cancelledToggle',
    'cancelledTitle',
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
      mt: '350',
    },
    cancelledToggle: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '100',
      background: 'transparent',
      border: 'none',
      p: '50',
      mb: '200',
      cursor: 'pointer',
      color: 'text.secondary',
      fontSize: '15px',
      fontWeight: '600',
      borderRadius: 'md',
      transition: 'color 0.15s ease',
      _hover: { color: 'text.primary' },
      _focusVisible: {
        outline: '2px solid',
        outlineColor: 'accent.primary',
        outlineOffset: '2px',
      },
    },
    cancelledTitle: {
      fontSize: '15px',
      fontWeight: '600',
    },
  },
});
