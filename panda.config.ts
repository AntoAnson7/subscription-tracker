import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: {
            value:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "SF Pro", sans-serif',
          },
          mono: {
            value: 'SF Mono, ui-monospace, Menlo, Monaco, Consolas, monospace',
          },
        },
        colors: {
          apple: {
            canvas: { value: '#F5F5F7' },
            card: { value: '#FFFFFF' },
            textPrimary: { value: '#1D1D1F' },
            textSecondary: { value: '#86868B' },
            border: { value: 'rgba(0, 0, 0, 0.08)' },
            blue: { value: '#0071E3' },
            blueHover: { value: '#0077ED' },
            green: { value: '#34C759' },
            amber: { value: '#FF9500' },
            red: { value: '#FF3B30' },
            purple: { value: '#AF52DE' },
          },
        },
        radii: {
          appleSm: { value: '8px' },
          appleMd: { value: '12px' },
          appleLg: { value: '16px' },
          appleXl: { value: '22px' },
          applePill: { value: '9999px' },
        },
      },
    },
  },
  jsxFramework: 'react',
  outdir: 'styled-system',
});
