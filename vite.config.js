import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const { PORT } = process.env

export default defineConfig({
  plugins: [react()],
  server: {
    port: PORT || 5173
  }
})
