import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    include: "**/*.{jsx,js}"
  })],
  server: {
    port: 3000,
    open: true,
    historyApiFallback: true
  },
  build: {
    outDir: 'build'
  },
  define: {
    global: 'globalThis'
  },
  esbuild: {
    loader: 'jsx',
    include: /src.*\.[jt]sx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  }
})