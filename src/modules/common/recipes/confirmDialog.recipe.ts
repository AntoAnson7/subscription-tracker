import { sva } from 'styled-system/css';

const baseIconStyle = {
  width: '40px',
  height: '40px',
  borderRadius: 'full',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const baseBtnStyle = {
  height: '36px',
  px: '200',
  borderRadius: 'xl',
  fontSize: '13px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

export const confirmDialogStyles = sva({
  slots: [
    'backdrop',
    'dialog',
    'header',
    'iconContainer',
    'content',
    'title',
    'description',
    'footer',
    'cancelBtn',
    'confirmBtn',
  ],
  base: {
    backdrop: {
      position: 'fixed',
      inset: '0',
      bg: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: '200',
      zIndex: 1200,
    },
    dialog: {
      position: 'relative',
      width: '100%',
      maxWidth: '420px',
      borderRadius: '2xl',
      border: '1px solid',
      borderColor: 'border.subtle',
      bg: 'bg.primary',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
      p: { base: '250', sm: '300' },
      display: 'flex',
      flexDirection: 'column',
      gap: '250',
      overflow: 'hidden',
    },
    header: { display: 'flex', alignItems: 'flex-start', gap: '200' },
    iconContainer: baseIconStyle,
    content: { display: 'flex', flexDirection: 'column', gap: '50', flex: 1, minWidth: 0 },
    title: { fontSize: '16px', fontWeight: '700', color: 'text.primary', letterSpacing: '-0.2px' },
    description: { fontSize: '13px', color: 'text.secondary', lineHeight: '1.5' },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '150',
      pt: '50',
    },
    cancelBtn: {
      ...baseBtnStyle,
      border: '1px solid',
      borderColor: 'border.subtle',
      bg: 'bg.secondary',
      color: 'text.primary',
      _hover: { bg: 'bg.hover', borderColor: 'border.default' },
      _focusVisible: { outline: '2px solid', outlineColor: 'accent.primary', outlineOffset: '2px' },
    },
    confirmBtn: {
      ...baseBtnStyle,
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '100',
      _disabled: { opacity: 0.6, cursor: 'not-allowed' },
      _focusVisible: { outline: '2px solid', outlineOffset: '2px' },
    },
  },
  variants: {
    variant: {
      danger: {
        iconContainer: {
          bg: 'status.dangerBg',
          color: 'status.danger',
          border: '1px solid',
          borderColor: 'status.dangerBorder',
        },
        confirmBtn: {
          bg: 'status.danger',
          color: '#ffffff',
          _hover: { opacity: 0.9 },
          _focusVisible: { outlineColor: 'status.danger' },
        },
      },
      warning: {
        iconContainer: {
          bg: 'status.warningBg',
          color: 'status.warning',
          border: '1px solid',
          borderColor: 'status.warningBorder',
        },
        confirmBtn: {
          bg: 'accent.primary',
          color: '#ffffff',
          _hover: { opacity: 0.9 },
          _focusVisible: { outlineColor: 'accent.primary' },
        },
      },
      default: {
        iconContainer: {
          bg: 'accent.subtle',
          color: 'accent.primary',
          border: '1px solid',
          borderColor: 'accent.border',
        },
        confirmBtn: {
          bg: 'accent.primary',
          color: '#ffffff',
          _hover: { opacity: 0.9 },
          _focusVisible: { outlineColor: 'accent.primary' },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'danger',
  },
});
