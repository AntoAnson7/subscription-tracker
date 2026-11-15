import { sva } from 'styled-system/css';

export const analyticsStyles = sva({
  slots: [
    'root',
    'summaryGrid',
    'summaryCard',
    'summaryLabel',
    'summaryValue',
    'summarySub',
    'gridTwoCol',
    'fullWidthCol',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '300',
      width: '100%',
    },
    summaryGrid: {
      display: 'grid',
      gridTemplateColumns: {
        base: '1fr',
        sm: 'repeat(2, minmax(0, 1fr))',
        lg: 'repeat(4, minmax(0, 1fr))',
      },
      gap: '200',
    },
    summaryCard: {
      background: 'bg.primary',
      borderRadius: '2xl',
      border: '1px solid',
      borderColor: 'border.subtle',
      p: { base: '200', md: '250' },
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: '50',
      _dark: {
        borderColor: 'border.default',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
      },
    },
    summaryLabel: {
      fontSize: '12px',
      fontWeight: '600',
      letterSpacing: '0.2px',
      color: 'text.secondary',
    },
    summaryValue: {
      fontSize: { base: '20px', md: '22px' },
      fontWeight: '800',
      fontVariantNumeric: 'tabular-nums',
      color: 'text.primary',
      lineHeight: '1.2',
    },
    summarySub: {
      fontSize: '12px',
      color: 'text.secondary',
    },
    gridTwoCol: {
      display: 'grid',
      gridTemplateColumns: { base: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
      gap: '300',
      alignItems: 'start',
    },
    fullWidthCol: {
      width: '100%',
    },
  },
});
