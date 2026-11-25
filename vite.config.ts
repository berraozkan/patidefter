import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// base: './' → GitHub Pages alt klasöründe de (kullanici.github.io/patidefter) çalışır
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
