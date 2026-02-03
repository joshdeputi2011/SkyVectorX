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

  // REQUIRED because you're using /docs instead of gh-pages
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },

  // Optional but safe
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
