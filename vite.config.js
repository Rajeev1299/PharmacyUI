import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Backend dev port lives here in one place. If your API's launchSettings.json
// uses a different port, update BACKEND_URL below.
const BACKEND_URL = 'https://localhost:7081'

export default defineConfig({
  plugins: [react()],
  base: './', // so built assets resolve correctly when served from wwwroot
  server: {
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false, // allow the ASP.NET Core dev https cert
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})
