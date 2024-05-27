import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: './mock'  // mock数据所在的目录 ./mock 代表和vite.config.js同级目录即根目录
    }),
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
