import { sva } from 'styled-system/css';

export const annualStatsStyles = sva({
  slots: ['row', 'text', 'pill'],
  base: {
    row: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '150' },
    text: { fontSize: '14px', color: 'text.secondary' },
    pill: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '50',
      px: '150',
      py: '50',
      borderRadius: 'pill',
      fontSize: '12px',
      fontWeight: '600',
      background: 'accent.subtle',
      color: 'accent.primary',
    },
  },
});
