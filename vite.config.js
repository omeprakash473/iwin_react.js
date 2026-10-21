import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({command, isPreview}) => ({
  base: command === 'build' || isPreview ? '/iwin_react.js/' : '/',
  plugins: [react()],
  server: { proxy: { '/backend': { target: 'https://api-dev.i-winlearning.com', changeOrigin: true, rewrite: requestPath => requestPath.slice('/backend'.length) } } },
}));
