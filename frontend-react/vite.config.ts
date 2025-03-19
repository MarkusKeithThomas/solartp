import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Để truy cập từ máy khác
    port: 5173, // Đổi nếu cần
    strictPort: true, // Không cho phép thay đổi cổng nếu bị chiếm dụng
    hmr: {
      overlay: false // Tắt lỗi overlay của HMR nếu cần
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true, // Xóa thư mục dist trước khi build
  },
  preview: {
    port: 4173, // Đổi cổng preview nếu cần
  }
})