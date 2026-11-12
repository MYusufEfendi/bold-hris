import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative base so the build works both on username.github.io/nama-repo
  // and on a custom domain without further changes.
  base: './',
  plugins: [react()],
})
