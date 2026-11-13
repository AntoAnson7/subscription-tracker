import { sva } from 'styled-system/css';

export const trialAlertStyles = sva({
  slots: ['root', 'contentWrapper', 'icon', 'textWrapper', 'title', 'subtitle', 'actionLink'],
  base: {
    root: {
      p: '200',
      borderRadius: 'lg',
      mb: '300',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '200',
      background: 'status.dangerBg',
      border: '1px solid',
      borderColor: 'status.dangerBorder',
      backdropFilter: 'blur(16px)',
    },
    contentWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '150',
    },
    icon: {
      color: 'status.danger',
      flexShrink: 0,
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '50',
    },
    title: {
      fontSize: '14px',
      fontWeight: '700',
      color: 'status.danger',
    },
    subtitle: {
      fontSize: '13px',
      color: 'status.danger',
      opacity: 0.9,
    },
    actionLink: {
      fontSize: '13px',
      fontWeight: '600',
      color: 'status.danger',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      _hover: { textDecoration: 'underline' },
    },
  },
});
