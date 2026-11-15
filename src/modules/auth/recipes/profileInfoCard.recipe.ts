import { sva } from 'styled-system/css';

export const profileInfoCardStyles = sva({
  slots: ['card', 'label', 'value'],
  base: {
    card: {
      display: 'flex',
      flexDirection: 'column',
      gap: '50',
      p: '200',
      borderRadius: 'lg',
      background: 'bg.secondary',
      border: '1px solid',
      borderColor: 'border.subtle',
    },
    label: {
      fontSize: '12px',
      fontWeight: '500',
      color: 'text.secondary',
      display: 'block',
    },
    value: {
      fontSize: '14px',
      fontWeight: '700',
      color: 'text.primary',
      display: 'block',
    },
  },
});
