import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  server: {
    allowedHosts: ["all", "localhost"],
    port: 3000,
    proxy: {
      "/api": {
        target:
          "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
