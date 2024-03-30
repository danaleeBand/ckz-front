import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // 프로젝트 루트의 src 디렉토리를 가리키는 별칭 설정
    },
  },
  optimizeDeps: {
    exclude: ['strip-ansi'], // optimizeDeps에서 strip-ansi를 제외하여 번들링 과정에서 해당 모듈이 빌드되지 않도록 설정
  },
  server: {
    port: 3000, // 개발 서버 포트 설정
  },
});
