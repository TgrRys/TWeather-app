import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  extensions: ['.js', '.jsx', '.json'],
  plugins: [react()],
})
