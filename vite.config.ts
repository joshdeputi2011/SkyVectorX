import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // 🔑 REQUIRED for GitHub Pages
  base: "/SkyVectorX/",

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Raw asset support
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
