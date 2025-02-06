import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  build: {
    assetsDir: 'assets', // Ensure assets are correctly bundled
  },
  base: '/', // Use this if the app is deployed at the root
})
