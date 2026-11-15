import { sva } from 'styled-system/css';

export const landingPreviewCardStyles = sva({
  slots: [
    'subCard',
    'subCardTop',
    'subCardName',
    'subCardCost',
    'subCardBottom',
    'subDetail',
    'badge',
  ],
  base: {
    subCard: {
      p: '200',
      borderRadius: 'xl',
      bg: 'bg.canvas',
      border: '1px solid',
      borderColor: 'border.subtle',
      display: 'flex',
      flexDirection: 'column',
      gap: '100',
      transition: 'transform 0.15s ease',
      _hover: { transform: 'translateY(-2px)' },
    },
    subCardTop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    subCardName: {
      fontSize: '14px',
      fontWeight: '700',
      color: 'text.primary',
    },
    subCardCost: {
      fontSize: '14px',
      fontWeight: '800',
      color: 'text.primary',
    },
    subCardBottom: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '11px',
    },
    subDetail: {
      color: 'text.secondary',
      fontSize: '11px',
    },
    badge: {
      px: '100',
      py: '25',
      borderRadius: 'pill',
      fontSize: '10px',
      fontWeight: '700',
    },
  },
});
