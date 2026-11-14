import { sva } from 'styled-system/css';

export const subscriptionTableStyles = sva({
  slots: ['root', 'table', 'thead', 'th', 'tr', 'td', 'brandCell', 'manageLink'],
  base: {
    root: {
      background: 'bg.secondary',
      borderColor: 'border.subtle',
      borderRadius: 'xl',
      border: '1px solid',
      overflowX: 'auto',
      backdropFilter: 'blur(20px)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left',
      fontSize: '14px',
    },
    thead: {
      borderBottom: '1px solid',
      borderBottomColor: 'border.subtle',
      background: 'bg.muted',
    },
    th: {
      py: '200',
      px: '200',
      fontWeight: '700',
      color: 'text.primary',
    },
    tr: {
      borderBottom: '1px solid',
      borderBottomColor: 'border.subtle',
      transition: 'background 0.15s ease',
      _hover: {
        background: 'bg.hover',
      },
    },
    td: {
      py: '150',
      px: '200',
      color: 'text.primary',
    },
    brandCell: {
      display: 'flex',
      alignItems: 'center',
      gap: '150',
    },
    manageLink: {
      fontSize: '13px',
      color: 'accent.primary',
      textDecoration: 'none',
      fontWeight: '600',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      p: 0,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '50',
      _hover: { textDecoration: 'underline' },
    },
  },
});
