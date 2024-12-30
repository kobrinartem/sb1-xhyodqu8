import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react'], // Key fix: include instead of exclude
  },
  build: {
    sourcemap: true,
  },
  server: {
    open: true,
    host: true,
    cors: true,
  },
});