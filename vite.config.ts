import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      onwarn(warning, warn) {
        // 특정 경고 무시
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || 
            warning.message.includes('class-transformer') ||
            warning.message.includes('@nestjs') ||
            warning.message.includes('@grpc')) {
          return;
        }
        warn(warning);
      },
    },
  },
  optimizeDeps: {
    exclude: ['@nestjs/microservices', 'class-transformer', '@grpc/proto-loader'],
  },
  ssr: {
    noExternal: true,
  },
  // 외부 모듈로 취급할 패키지들 지정
  server: {
    fs: {
      strict: false,
    },
    // 프록시 설정 - 개발 환경에서는 로컬 서버, 배포 환경에서는 외부 서버
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://58.236.96.102:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})