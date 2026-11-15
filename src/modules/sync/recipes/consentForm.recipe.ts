import { sva } from 'styled-system/css';

export const consentFormStyles = sva({
  slots: ['inputGroup', 'textInput', 'privacyBox', 'consentRow'],
  base: {
    inputGroup: {
      mb: '250',
      '& label': {
        display: 'block',
        fontSize: '12px',
        fontWeight: '600',
        color: 'text.secondary',
        mb: '50',
      },
    },
    textInput: {
      width: '100%',
      height: '40px',
      px: '150',
      borderRadius: 'md',
      border: '1px solid',
      borderColor: 'border.default',
      bg: 'bg.secondary',
      color: 'text.primary',
      fontSize: { base: '16px', sm: '14px' },
      _focus: { borderColor: 'accent.primary', outline: 'none' },
    },
    privacyBox: {
      p: '200',
      borderRadius: 'lg',
      bg: 'bg.secondary',
      border: '1px solid',
      borderColor: 'border.subtle',
      mb: '250',
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
      mb: '300',
      display: 'flex',
      alignItems: 'flex-start',
    },
  },
});
