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
    'cancelledContent',
    'cancelledInner',
    'chevronIcon',
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
      mb: '150',
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
    cancelledContent: {
      display: 'grid',
      transition: 'grid-template-rows 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
      willChange: 'grid-template-rows, opacity',
    },
    cancelledInner: {
      overflow: 'hidden',
      py: '50',
      px: '50',
    },
    chevronIcon: {
      transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
      flexShrink: 0,
    },
  },
  variants: {
    isOpen: {
      true: {
        cancelledContent: {
          gridTemplateRows: '1fr',
          opacity: 1,
        },
        chevronIcon: {
          transform: 'rotate(90deg)',
        },
      },
      false: {
        cancelledContent: {
          gridTemplateRows: '0fr',
          opacity: 0,
        },
        chevronIcon: {
          transform: 'rotate(0deg)',
        },
      },
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});
