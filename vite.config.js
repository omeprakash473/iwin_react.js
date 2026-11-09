import { defineConfig,loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({command, isPreview,mode}) => {
 const env=loadEnv(mode,process.cwd(),'VITE_');
 return {
  base: env.VITE_BASE_PATH || (command === 'build' || isPreview ? '/iwin_react.js/' : '/'),
  plugins: [react()],
  server: { proxy: { '/backend': { target: 'https://api-dev.i-winlearning.com', changeOrigin: true, rewrite: requestPath => requestPath.slice('/backend'.length) } } },
 };
});
