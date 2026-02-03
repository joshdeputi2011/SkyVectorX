import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // REQUIRED for GitHub Pages (repo name)
  base: '/SkyVectorX/',

  // Keep default build output (dist/)
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
