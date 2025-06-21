import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    port: 5173,
    proxy: {
      // Proxy para enviar las llamadas /api al backend Spring Boot
      '/api': 'http://localhost:3000'
    }
  }
})
