// c:\Users\Raphael\Downloads\Compressed\Practical-Love-vanquish\project\vite.config.ts
import { defineConfig } from 'vite'; // <-- use Vite's defineConfig
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: { '@': '/src' },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true,
  },
  // Vitest settings are fine here; Vitest extends Vite's config type.
  test: {
    globals: true,
    environment: 'node',
  },
  server: {
    port: 3000,
    host: '127.0.0.1',
  },
});
