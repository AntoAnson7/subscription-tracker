export const semanticTokens = {
  colors: {
    bg: {
      canvas: { value: { base: '#F6F6F9', _dark: '#08090C' } },
      primary: { value: { base: '#FFFFFF', _dark: '#18181B' } },
      secondary: {
        value: {
          base: 'rgba(255, 255, 255, 0.85)',
          _dark: 'rgba(24, 24, 27, 0.75)',
        },
      },
      tertiary: {
        value: {
          base: 'rgba(0, 0, 0, 0.03)',
          _dark: 'rgba(255, 255, 255, 0.05)',
        },
      },
      hover: {
        value: {
          base: 'rgba(0, 0, 0, 0.04)',
          _dark: 'rgba(255, 255, 255, 0.08)',
        },
      },
      muted: {
        value: {
          base: 'rgba(0, 0, 0, 0.02)',
          _dark: 'rgba(255, 255, 255, 0.02)',
        },
      },
    },
    text: {
      primary: { value: { base: '#1D1D1F', _dark: '#F5F5F7' } },
      secondary: { value: { base: '#71717A', _dark: '#A1A1AA' } },
      tertiary: { value: { base: '#A1A1AA', _dark: '#71717A' } },
      inverse: { value: { base: '#FFFFFF', _dark: '#000000' } },
    },
    border: {
      subtle: {
        value: {
          base: 'rgba(0, 0, 0, 0.06)',
          _dark: 'rgba(255, 255, 255, 0.08)',
        },
      },
      default: {
        value: {
          base: 'rgba(0, 0, 0, 0.08)',
          _dark: 'rgba(255, 255, 255, 0.1)',
        },
      },
      strong: {
        value: {
          base: 'rgba(0, 0, 0, 0.15)',
          _dark: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
    accent: {
      primary: { value: { base: '#D97706', _dark: '#F59E0B' } },
      subtle: {
        value: {
          base: 'rgba(217, 119, 6, 0.1)',
          _dark: 'rgba(245, 158, 11, 0.15)',
        },
      },
      border: {
        value: {
          base: 'rgba(217, 119, 6, 0.15)',
          _dark: 'rgba(245, 158, 11, 0.25)',
        },
      },
    },
    status: {
      danger: { value: { base: '#EF4444', _dark: '#F87171' } },
      dangerBg: {
        value: {
          base: 'rgba(239, 68, 68, 0.08)',
          _dark: 'rgba(239, 68, 68, 0.15)',
        },
      },
      dangerBorder: {
        value: {
          base: 'rgba(239, 68, 68, 0.2)',
          _dark: 'rgba(239, 68, 68, 0.3)',
        },
      },
      warning: { value: { base: '#F59E0B', _dark: '#FBBF24' } },
      warningBg: {
        value: {
          base: 'rgba(245, 158, 11, 0.1)',
          _dark: 'rgba(245, 158, 11, 0.15)',
        },
      },
      success: { value: { base: '#10B981', _dark: '#34D399' } },
      successBg: {
        value: {
          base: 'rgba(16, 185, 129, 0.1)',
          _dark: 'rgba(16, 185, 129, 0.15)',
        },
      },
    },
  },
};
