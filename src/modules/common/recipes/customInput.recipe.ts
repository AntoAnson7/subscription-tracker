import { sva } from 'styled-system/css';

export const customInputStyles = sva({
  slots: ['root', 'label', 'inputWrapper', 'input', 'leftAdornment', 'rightAdornment', 'errorText'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '50',
      width: '100%',
    },
    label: {
      fontSize: '13px',
      fontWeight: '500',
      color: 'text.secondary',
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      width: '100%',
      minHeight: '44px',
      px: '150',
      py: '150',
      borderRadius: 'md',
      border: '1px solid',
      borderColor: 'border.default',
      background: 'bg.secondary',
      color: 'text.primary',
      fontSize: { base: '16px', sm: '14px' },
      outline: 'none',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      _placeholder: {
        color: 'text.tertiary',
      },
      _focusVisible: {
        outline: '2px solid',
        outlineColor: 'accent.primary',
        outlineOffset: '2px',
        borderColor: 'accent.primary',
      },
      _disabled: {
        opacity: 0.6,
        cursor: 'not-allowed',
      },
    },
    leftAdornment: {
      position: 'absolute',
      left: '150',
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
      color: 'text.tertiary',
    },
    rightAdornment: {
      position: 'absolute',
      right: '150',
      display: 'flex',
      alignItems: 'center',
      color: 'text.tertiary',
    },
    errorText: {
      fontSize: '11px',
      color: 'status.danger',
      mt: '50',
    },
  },
  variants: {
    hasError: {
      true: {
        input: {
          borderColor: 'status.danger',
          _focusVisible: {
            outlineColor: 'status.danger',
          },
        },
      },
    },
  },
});
