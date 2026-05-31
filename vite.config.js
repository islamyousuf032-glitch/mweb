import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// YOUSUF UNBOUND — Vite config
// base './' so the production build works when opened from any path
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
  },
  server: {
    host: true,
    port: 5173,
  },
})
