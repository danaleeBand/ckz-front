import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    process.env.NODE_ENV === 'production' && removeConsole(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['strip-ansi'],
  },
  server: {
    port: 3000,
  },
});
