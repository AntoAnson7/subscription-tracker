import { cva } from 'styled-system/css';

export const markdownContentStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    '& h1': {
      fontSize: '20px',
      fontWeight: '800',
      color: 'text.primary',
      letterSpacing: '-0.3px',
      mb: '100',
    },
    '& h2': {
      fontSize: '15px',
      fontWeight: '700',
      color: 'text.primary',
      letterSpacing: '-0.2px',
      mt: '250',
      mb: '100',
    },
    '& h3': {
      fontSize: '13px',
      fontWeight: '700',
      color: 'text.primary',
      mt: '150',
      mb: '50',
    },
    '& p': {
      fontSize: '13px',
      lineHeight: '1.6',
      color: 'text.secondary',
      mb: '150',
    },
    '& ul, & ol': {
      pl: '250',
      mb: '150',
      display: 'flex',
      flexDirection: 'column',
      gap: '50',
    },
    '& li': {
      fontSize: '13px',
      lineHeight: '1.5',
      color: 'text.secondary',
    },
    '& blockquote': {
      p: '200',
      borderRadius: 'lg',
      bg: 'bg.secondary',
      border: '1px solid',
      borderColor: 'accent.primary',
      my: '200',
      display: 'flex',
      flexDirection: 'column',
      gap: '100',
      '& p': {
        m: 0,
        color: 'text.primary',
        fontSize: '13px',
        lineHeight: '1.5',
      },
      '& strong': {
        color: 'accent.primary',
      },
    },
    '& a': {
      color: 'accent.primary',
      textDecoration: 'underline',
      _hover: { opacity: 0.85 },
    },
    '& strong': {
      color: 'text.primary',
      fontWeight: '700',
    },
    '& em': {
      fontStyle: 'italic',
      color: 'text.tertiary',
      fontSize: '12px',
    },
    '& code': {
      px: '50',
      py: '25',
      borderRadius: 'sm',
      bg: 'bg.secondary',
      border: '1px solid',
      borderColor: 'border.subtle',
      fontSize: '12px',
      fontFamily: 'monospace',
    },
    '& hr': {
      height: '1px',
      bg: 'border.subtle',
      border: 'none',
      my: '200',
    },
  },
});
