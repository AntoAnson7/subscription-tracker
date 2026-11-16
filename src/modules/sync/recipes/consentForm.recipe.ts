import { sva } from 'styled-system/css';

export const consentFormStyles = sva({
  slots: ['privacyBox', 'consentRow'],
  base: {
    privacyBox: {
      p: '200',
      borderRadius: 'lg',
      bg: 'bg.secondary',
      border: '1px solid',
      borderColor: 'border.subtle',
      mb: '200',
      display: 'flex',
      flexDirection: 'column',
      gap: '150',
      '& > div': {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '100',
        fontSize: '12px',
        color: 'text.secondary',
        lineHeight: '1.4',
        '& svg': { color: 'accent.primary', mt: '2px', flexShrink: 0 },
      },
    },
    consentRow: {
      p: '150',
      borderRadius: 'md',
      bg: 'bg.secondary',
      border: '1px solid',
      borderColor: 'border.subtle',
      mb: '200',
      display: 'flex',
      alignItems: 'center',
      minHeight: '44px',
    },
  },
});
