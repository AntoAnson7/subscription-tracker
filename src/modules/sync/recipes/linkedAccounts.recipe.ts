import { sva } from 'styled-system/css';

export const linkedAccountsStyles = sva({
  slots: [
    'section',
    'sectionHeader',
    'sectionTitle',
    'addAccountBtn',
    'accountsList',
    'emptyCard',
    'emptyText',
  ],
  base: {
    section: {
      mt: '250',
      pt: '250',
      borderTop: '1px solid',
      borderTopColor: 'border.subtle',
      textAlign: 'left',
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: '150',
    },
    sectionTitle: {
      fontSize: '13px',
      fontWeight: '600',
      color: 'text.secondary',
      textAlign: 'left',
    },
    addAccountBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '50',
      fontSize: '12px',
      fontWeight: '600',
      color: 'accent.primary',
      bg: 'transparent',
      border: 'none',
      cursor: 'pointer',
      p: '0',
      _hover: { textDecoration: 'underline' },
    },
    accountsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '150',
    },
    emptyCard: {
      p: '250',
      borderRadius: 'lg',
      border: '1px dashed',
      borderColor: 'border.default',
      bg: 'bg.secondary',
      textAlign: 'center',
    },
    emptyText: {
      fontSize: '12px',
      color: 'text.secondary',
      lineHeight: '1.4',
    },
  },
});
