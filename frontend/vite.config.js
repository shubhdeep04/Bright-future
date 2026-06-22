import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: true,
    port: 5173,

    proxy: {
      '/api': {
        // Always proxy to the IPv4 loopback to avoid LAN/IPv6 resolution issues
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        ws: false,
      },

      '/uploads': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        ws: false,
      },
    },
  }
})