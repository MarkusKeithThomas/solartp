import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true, // mặc định đã bật
  },
  define: {
    global: 'window' // 👈 Thêm dòng này
  }

  });