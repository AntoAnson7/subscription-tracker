import { sva } from 'styled-system/css';

export const checkboxStyles = sva({
  slots: ['root', 'input', 'control', 'label'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '100',
      cursor: 'pointer',
      userSelect: 'none',
      width: '100%',
    },
    input: {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: '0',
    },
    control: {
      width: '18px',
      height: '18px',
      borderRadius: '6px',
      border: '1.5px solid',
      borderColor: 'border.default',
      background: 'bg.secondary',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      mt: '0',
      transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
      _hover: { borderColor: 'accent.primary' },
    },
    label: {
      fontSize: '12px',
      fontWeight: '500',
      color: 'text.primary',
      lineHeight: '1.4',
    },
  },
  variants: {
    isMultiline: {
      true: {
        root: {
          alignItems: 'flex-start',
        },
        control: {
          mt: '2px',
        },
      },
      false: {
        root: {
          alignItems: 'center',
        },
        control: {
          mt: '0',
        },
      },
    },
    isChecked: {
      true: {
        control: {
          background: 'accent.primary',
          borderColor: 'accent.primary',
          color: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(217, 119, 6, 0.25)',
        },
      },
      false: {
        control: {
          background: 'bg.secondary',
          borderColor: 'border.default',
        },
      },
    },
    isFocused: {
      true: {
        control: {
          outline: '2px solid',
          outlineColor: 'accent.primary',
          outlineOffset: '2px',
        },
      },
      false: {},
    },
  },
});
