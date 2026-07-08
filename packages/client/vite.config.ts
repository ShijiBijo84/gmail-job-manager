import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss()
  ],
  server: {
    port: 5173,
    proxy: {
      "/emails": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
      "/auth": {
        target: "http://localhost:4000",
        changeOrigin: true,
      }
    }
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@gmail-job-manager/shared": path.resolve(
        __dirname,
        "../shared/src"
      ),
      "#components": path.resolve(__dirname, "./src/components"),
      "#constants": path.resolve(__dirname, "./src/constants"),
      "#pages": path.resolve(__dirname, "./src/pages")
    }
  }
})
