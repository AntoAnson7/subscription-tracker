import { sva } from 'styled-system/css';

export const appleDeviceRowStyles = sva({
  slots: ['subRow', 'subLeft', 'subName', 'subMeta', 'subRight', 'subCost', 'subPill'],
  base: {
    subRow: {
      p: '150',
      borderRadius: 'lg',
      bg: 'bg.canvas',
      border: '1px solid',
      borderColor: 'border.subtle',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '100',
    },
    subLeft: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
    },
    subName: {
      fontSize: '13px',
      fontWeight: '600',
      color: 'text.primary',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    subMeta: {
      fontSize: '11px',
      color: 'text.secondary',
    },
    subRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '100',
      flexShrink: 0,
    },
    subCost: {
      fontSize: '13px',
      fontWeight: '700',
      color: 'text.primary',
    },
    subPill: {
      fontSize: '10px',
      fontWeight: '600',
      px: '75',
      py: '25',
      borderRadius: 'pill',
    },
  },
});
