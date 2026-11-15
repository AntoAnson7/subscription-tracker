import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['ten-neck-assignment-reception.trycloudflare.com'],
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      'styled-system': path.resolve(import.meta.dirname, './styled-system'),
    },
  },
});
