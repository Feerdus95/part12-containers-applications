import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    host: '0.0.0.0',
    hmr: {
      // For development with Docker
      clientPort: 80,
    },
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  // Base URL for production builds
  base: mode === 'production' ? '/' : '/',
  // Ensure Vite handles the paths correctly in production
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  define: {
    // Ensure environment variables are available in the frontend
    'import.meta.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL || '/api'),
  },
  // Proxy is now handled by Nginx in production
  // In development, Vite's proxy is used when running without Nginx
}));
