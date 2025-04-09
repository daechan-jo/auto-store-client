import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      onwarn(warning, warn) {
        // 특정 경고 무시
        if (
          warning.code === 'MODULE_LEVEL_DIRECTIVE' ||
          warning.message.includes('class-transformer') ||
          warning.message.includes('@nestjs') ||
          warning.message.includes('@grpc')
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
  optimizeDeps: {
    exclude: ['@nestjs/microservices', 'class-transformer', '@grpc/proto-loader'],
  },
});
