import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    proxy: {
      // Proxy API requests to the backend
      '/api': {
        target: 'http://backend:3001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
        },
      },
    },
    headers: {
      // Add CSP headers
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data:;
        font-src 'self';
        connect-src 'self' http://localhost:3001 http://backend:3001;
        frame-ancestors 'none';
        form-action 'self';
        base-uri 'self';
      `.replace(/\s+/g, ' ').trim(),
    },
  },
  // For production build
  build: {
    sourcemap: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
});
