import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// `base` is set to the repo name for the production build so assets resolve
// correctly on GitHub Pages (served from https://<user>.github.io/my_website/).
// It stays "/" during local dev/preview.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/my_website/' : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
}))
