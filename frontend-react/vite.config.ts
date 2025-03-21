import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',  // Giúp định tuyến đúng khi deploy lên Vercel
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target:'https://56b0-115-73-178-46.ngrok-free.app',
        // target: 'http://localhost:8080', // Backend API
        changeOrigin: true,
        secure: false,
      }
    }
  },
});