import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/",  // Ensures correct asset paths
  build: {
    outDir: "dist",  // Output build to "dist" folder (default)
    assetsDir: "assets", // Keeps assets organized
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
})