import { sva } from 'styled-system/css';

export const landingMetricsStyles = sva({
  slots: ['section', 'container', 'grid', 'item', 'iconWrapper', 'value', 'label', 'subtext'],
  base: {
    section: {
      borderTop: '1px solid',
      borderBottom: '1px solid',
      borderColor: 'border.subtle',
      bg: 'bg.secondary',
      py: { base: '350', md: '450' },
      my: { base: '300', md: '400' },
    },
    container: {
      maxWidth: '1200px',
      mx: 'auto',
      px: { base: '200', sm: '300' },
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: { base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
      gap: '300',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: { base: 'flex-start', sm: 'center' },
      textAlign: { base: 'left', sm: 'center' },
      gap: '100',
    },
    iconWrapper: {
      width: '38px',
      height: '38px',
      borderRadius: 'lg',
      bg: 'bg.primary',
      border: '1px solid',
      borderColor: 'border.default',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'accent.primary',
      mb: '50',
    },
    value: {
      fontSize: { base: '28px', sm: '34px' },
      fontWeight: '900',
      letterSpacing: '-0.03em',
      color: 'text.primary',
      lineHeight: '1.1',
    },
    label: {
      fontSize: '14px',
      fontWeight: '700',
      color: 'text.primary',
    },
    subtext: {
      fontSize: '12px',
      color: 'text.secondary',
      lineHeight: '1.4',
      maxWidth: '240px',
    },
  },
});
