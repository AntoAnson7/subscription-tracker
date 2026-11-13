import { defineConfig } from '@pandacss/dev';
import { gradientTokens } from './src/theme/gradientTokens';
import { semanticTokens } from './src/theme/semanticTokens';
import { tokens } from './src/theme/tokens';

export default defineConfig({
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  conditions: {
    extend: {
      dark: '.dark &, [data-theme=dark] &',
    },
  },
  theme: {
    extend: {
      tokens,
      semanticTokens: {
        ...semanticTokens,
        gradients: gradientTokens,
      },
    },
  },
  jsxFramework: 'react',
  outdir: 'styled-system',
});
