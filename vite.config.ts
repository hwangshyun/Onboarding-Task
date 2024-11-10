import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "./src/index.css";`
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://moneyfulpublicpolicy.co.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
