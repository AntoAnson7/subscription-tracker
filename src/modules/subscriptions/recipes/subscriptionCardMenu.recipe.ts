import { sva } from 'styled-system/css';

export const subscriptionCardMenuStyles = sva({
  slots: ['root', 'trigger', 'menu', 'item', 'itemDanger'],
  base: {
    root: {
      position: 'relative',
    },
    trigger: {
      width: '28px',
      height: '28px',
      borderRadius: 'pill',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'bg.hover',
      color: 'text.secondary',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      _hover: {
        color: 'text.primary',
        background: 'bg.muted',
      },
      _focusVisible: {
        outline: '2px solid',
        outlineColor: 'accent.primary',
        outlineOffset: '2px',
      },
    },
    menu: {
      position: 'absolute',
      right: 0,
      minWidth: '160px',
      background: 'bg.primary',
      borderRadius: 'lg',
      border: '1px solid',
      borderColor: 'border.default',
      p: '50',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
    },
    item: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '100',
      px: '150',
      py: '100',
      borderRadius: 'md',
      fontSize: '13px',
      fontWeight: '500',
      color: 'text.primary',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      textDecoration: 'none',
      transition: 'background 0.15s ease',
      _hover: {
        background: 'bg.hover',
      },
      _focusVisible: {
        outline: '2px solid',
        outlineColor: 'accent.primary',
        outlineOffset: '-2px',
      },
    },
    itemDanger: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '100',
      px: '150',
      py: '100',
      borderRadius: 'md',
      fontSize: '13px',
      fontWeight: '500',
      color: 'status.danger',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'background 0.15s ease',
      _hover: {
        background: 'status.dangerBg',
      },
      _focusVisible: {
        outline: '2px solid',
        outlineColor: 'status.danger',
        outlineOffset: '-2px',
      },
    },
  },
  variants: {
    placement: {
      top: {
        menu: {
          bottom: 'calc(100% + 6px)',
          top: 'auto',
        },
      },
      bottom: {
        menu: {
          top: 'calc(100% + 6px)',
          bottom: 'auto',
        },
      },
    },
  },
  defaultVariants: {
    placement: 'top',
  },
});
