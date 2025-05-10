import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ],
  server: {
    proxy: {
      "/api": {
        target: "http://16.171.225.212/",
        secure: false,
      },
    },
  },
  build: {
    proxy: {
      "/api": {
        target: "http://16.171.225.212/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },
})
