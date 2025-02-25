import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      sass: {
        // You can add global SASS variables or mixins here, if needed
        additionalData: `@import "./src/styles/variables.sass"`,},
      },
    },
  resolve: {
    alias: {
      '@template': '/src/Template', // Adjust based on your actual folder structure
    }
  },
  plugins: [react(), tailwindcss()],
  
})
