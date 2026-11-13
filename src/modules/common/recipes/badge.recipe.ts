import { cva } from 'styled-system/css';

export const statusBadgeStyle = cva({
  base: {
    fontSize: '11px',
    fontWeight: '700',
    px: '100',
    py: '50',
    borderRadius: 'pill',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '50',
    transition: 'all 0.15s ease',
  },
  variants: {
    status: {
      active: {
        background: 'status.successBg',
        color: 'status.success',
      },
      trial: {
        background: 'status.warningBg',
        color: 'status.warning',
      },
      paused: {
        background: 'bg.hover',
        color: 'text.secondary',
      },
      cancelled: {
        background: 'status.dangerBg',
        color: 'status.danger',
      },
    },
  },
  defaultVariants: {
    status: 'active',
  },
});
