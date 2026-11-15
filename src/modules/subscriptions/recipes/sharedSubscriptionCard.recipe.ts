import { sva } from 'styled-system/css';

export const sharedSubscriptionCardStyles = sva({
  slots: ['badge', 'shareTag', 'breakdown', 'breakdownRow', 'breakdownSub'],
  base: {
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '50',
      px: '100',
      py: '2px',
      borderRadius: 'pill',
      bg: 'accent.subtle',
      border: '1px solid',
      borderColor: 'accent.border',
      color: 'accent.primary',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '-0.2px',
    },
    shareTag: {
      fontSize: '10px',
      fontWeight: '700',
      color: 'accent.primary',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      mb: '25',
    },
    breakdown: {
      mt: '100',
      p: '100',
      borderRadius: 'md',
      bg: 'bg.tertiary',
      border: '1px solid',
      borderColor: 'border.subtle',
      display: 'flex',
      flexDirection: 'column',
      gap: '25',
    },
    breakdownRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '50',
      fontSize: '12px',
      color: 'text.primary',
      '& strong': {
        fontWeight: '700',
      },
    },
    breakdownSub: {
      fontSize: '10.5px',
      color: 'text.secondary',
    },
  },
});
