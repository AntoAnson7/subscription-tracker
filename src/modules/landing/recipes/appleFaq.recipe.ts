import { sva } from 'styled-system/css';

const focusRing = { outline: '2px solid', outlineColor: 'accent.primary', outlineOffset: '-2px' };

export const appleFaqStyles = sva({
  slots: [
    'section',
    'header',
    'eyebrow',
    'title',
    'list',
    'item',
    'button',
    'question',
    'icon',
    'answer',
  ],
  base: {
    section: {
      py: { base: '400', md: '500' },
      maxWidth: '820px',
      mx: 'auto',
      px: { base: '150', sm: '200', md: '300' },
      width: '100%',
      boxSizing: 'border-box',
    },
    header: {
      textAlign: 'center',
      mb: { base: '300', md: '450' },
    },
    eyebrow: {
      fontSize: '12px',
      fontWeight: '600',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'accent.primary',
      mb: '75',
    },
    title: {
      fontSize: { base: '26px', sm: '36px' },
      fontWeight: '700',
      letterSpacing: '-0.02em',
      color: 'text.primary',
    },
    list: {
      borderTop: '1px solid',
      borderColor: 'border.subtle',
      display: 'flex',
      flexDirection: 'column',
    },
    item: {
      borderBottom: '1px solid',
      borderColor: 'border.subtle',
    },
    button: {
      width: '100%',
      py: '200',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '150',
      bg: 'transparent',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      _focusVisible: focusRing,
    },
    question: {
      fontSize: '15px',
      fontWeight: '600',
      color: 'text.primary',
      letterSpacing: '-0.01em',
    },
    icon: {
      color: 'text.tertiary',
      transition: 'transform 0.2s ease',
      flexShrink: 0,
    },
    answer: {
      pb: '200',
      fontSize: '13px',
      lineHeight: '1.6',
      color: 'text.secondary',
    },
  },
});
