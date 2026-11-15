import { sva } from 'styled-system/css';

export const syncCardStyles = sva({
  slots: ['card', 'cardLeft', 'iconBox', 'cardRight'],
  base: {
    card: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: '200',
      borderRadius: 'xl',
      border: '1px solid',
      borderColor: 'border.subtle',
      bg: 'bg.secondary',
      transition: 'all 0.2s ease',
      _hover: { borderColor: 'accent.primary' },
    },
    cardLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '150',
      minWidth: 0,
      '& input': {
        accentColor: 'var(--colors-accent-primary)',
        width: '18px',
        height: '18px',
        cursor: 'pointer',
      },
      '& h4': {
        fontSize: '15px',
        fontWeight: '600',
        color: 'text.primary',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& p': { fontSize: '12px', color: 'text.secondary', mt: '2px' },
    },
    iconBox: {
      width: '40px',
      height: '40px',
      borderRadius: 'md',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    cardRight: {
      textAlign: 'right',
      flexShrink: 0,
      '& div': { fontSize: '16px', fontWeight: '700', color: 'text.primary' },
      '& span': { fontSize: '11px', color: 'text.tertiary' },
    },
  },
});
